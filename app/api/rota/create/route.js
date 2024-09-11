// app/api/rota/create/route.js

import { parseExcelFile } from '/utils/excelUtils';
import { NextResponse } from 'next/server';
import connectMongo from '/db/connectMongo';
import Rota from '/models/Rota';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const name = formData.get('name'); // Get rota name from form data
    const weekStart = formData.get('weekStart'); // Get weekStart from form data

    console.log('File received:', file);
    console.log('File name:', file?.name);
    console.log('Rota name:', name);
    console.log('Week start date:', weekStart);

    if (!file || !name || !weekStart) {
      return NextResponse.json(
        { error: 'File, name, or week start date not provided' },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer()); // Convert to Buffer
    let jsonData = await parseExcelFile(fileBuffer);

    // Filter out empty objects
    jsonData = jsonData.filter((item) => {
      return item.staff?.trim() || item.post?.trim();
    });

    console.log('Filtered Parsed Data to Save:', jsonData); // Debugging line

    // Save the parsed data to MongoDB
    await connectMongo();
    const newRota = new Rota({
      name: name,
      weekStart: new Date(weekStart), // Store weekStart as Date
      fileData: file.name, // Store file name or path
      parsedData: jsonData,
    });

    await newRota.save();
    return NextResponse.json(newRota);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
