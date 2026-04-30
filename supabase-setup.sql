-- Mobile Fix Near Me - Contact Submissions Table
-- Run this SQL in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT NOT NULL,
  device_type TEXT NOT NULL,
  issue_description TEXT NOT NULL,
  preferred_datetime TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'new' -- new, contacted, completed
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_status ON contact_submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT from anyone (for form submissions)
CREATE POLICY "Allow public insert" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow SELECT for authenticated users only (for admin dashboard)
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Grant permissions
GRANT INSERT ON contact_submissions TO anon;
GRANT ALL ON contact_submissions TO authenticated;

-- Success message
SELECT 'Contact Submissions table created successfully!' as message;
