-- SQL Script to Generate Account Numbers for Existing Customers
-- Run this script on your MySQL database to assign account numbers to existing customers
-- that don't have account numbers yet.

-- This script will:
-- 1. Generate a random 12-digit account number for each customer
-- 2. Ensure uniqueness
-- 3. Update all customers that have NULL accountNumber

SET @prefix = 100000000000;
SET @suffix = 999999999999;

-- Update customers with NULL accountNumber
UPDATE customer_table
SET accountNumber = CONCAT(
    LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0'),
    LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0')
)
WHERE accountNumber IS NULL;

-- Note: If you get duplicate constraint errors, run this:
-- This version ensures no duplicates by using customer ID
UPDATE customer_table
SET accountNumber = CONCAT(
    LPAD(id, 6, '0'),
    LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0')
)
WHERE accountNumber IS NULL;

-- Verify the update
SELECT id, accountNumber, fullName FROM customer_table;

