-- Add Eisenhower Matrix fields to todos table
ALTER TABLE "todos" ADD COLUMN "urgency" integer DEFAULT 1 NOT NULL;
ALTER TABLE "todos" ADD COLUMN "importance" integer DEFAULT 1 NOT NULL;
ALTER TABLE "todos" ADD COLUMN "matrix_quadrant" text DEFAULT 'do_later' NOT NULL;

-- Add comments for clarity
COMMENT ON COLUMN "todos"."urgency" IS 'Urgency level: 1=low, 2=medium, 3=high';
COMMENT ON COLUMN "todos"."importance" IS 'Importance level: 1=low, 2=medium, 3=high';
COMMENT ON COLUMN "todos"."matrix_quadrant" IS 'Eisenhower Matrix quadrant: do_first, schedule, delegate, do_later';

-- Update existing todos to have default matrix quadrant based on current priority
-- High priority (3) -> do_first, Medium priority (2) -> schedule, Low priority (1) -> do_later
UPDATE "todos" SET 
  "urgency" = CASE 
    WHEN "priority" = 3 THEN 3
    WHEN "priority" = 2 THEN 2
    ELSE 1
  END,
  "importance" = CASE 
    WHEN "priority" = 3 THEN 3
    WHEN "priority" = 2 THEN 2
    ELSE 1
  END,
  "matrix_quadrant" = CASE 
    WHEN "priority" = 3 THEN 'do_first'
    WHEN "priority" = 2 THEN 'schedule'
    ELSE 'do_later'
  END;