const { z } = require('zod');

const CreateImageSchema = z.object({
  title: z.string()
    .max(30, 'Title must be max 30 characters')
    .regex(/^[\w\s]+$/, 'Only letters, numbers, spaces, or underscores allowed'),
  url: z.string().url('Must be a valid URL'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
});

module.exports = { CreateImageSchema };