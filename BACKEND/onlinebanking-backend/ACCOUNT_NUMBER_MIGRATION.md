# Account Number Migration Guide

## Problem
Existing customers in the database don't have account numbers assigned because this feature was added after they were created.

## Solution

### Step 1: Run the SQL Migration Script

Connect to your MySQL database and run:

```bash
mysql -u root -p bankingdb < migrate_account_numbers.sql
```

Or manually execute in MySQL Workbench:

```sql
-- Update customers with NULL accountNumber
UPDATE customer_table
SET accountNumber = CONCAT(
    LPAD(id, 6, '0'),
    LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0')
)
WHERE accountNumber IS NULL;
```

### Step 2: Verify the Update

Check if all customers now have account numbers:

```sql
SELECT id, accountNumber, fullName, email FROM customer_table;
```

### Step 3: Restart Your Application

```bash
# In BACKEND/onlinebanking-backend
./mvnw spring-boot:run
```

### Step 4: Test

1. Log in as a customer
2. Go to Profile (click user icon in navbar)
3. You should now see a 12-digit account number
4. Go to Fund Transfer - you should see your account number displayed

---

## What This Script Does

- Generates a unique 12-digit account number for each customer
- Uses customer ID as part of the number to ensure uniqueness
- Updates all customers that have NULL accountNumber
- Format: `XXXXXXYYYYYY` (first 6 digits based on ID, last 6 digits random)

---

## Alternative: Manual SQL Command

If you want to generate account numbers yourself:

```sql
-- For each customer without an account number
UPDATE customer_table
SET accountNumber = CONCAT(
    LPAD(id, 6, '0'),              -- Customer ID (padded to 6 digits)
    LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0')  -- Random 6 digits
)
WHERE accountNumber IS NULL;
```

---

## After Migration

- **New registrations**: Will automatically get account numbers
- **Existing customers**: Will have account numbers assigned after running the script
- **Login**: Customer data will include accountNumber in the response

---

## Troubleshooting

### Error: Duplicate entry for key 'accountNumber'
This means some account numbers already exist. Try running:

```sql
-- Check for duplicates
SELECT accountNumber, COUNT(*) 
FROM customer_table 
GROUP BY accountNumber 
HAVING COUNT(*) > 1;

-- If found, regenerate:
UPDATE customer_table
SET accountNumber = CONCAT(
    LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0'),
    LPAD(FLOOR(RAND() * 900000) + 100000, 6, '0')
)
WHERE accountNumber = 'duplicate_value';
```

### Still showing "Not Assigned" in profile?
1. Make sure you ran the SQL script successfully
2. Log out and log back in to refresh your session data
3. Clear browser cache if needed

---

## Need Help?

If you continue to see "Not Assigned":
1. Check your database: `SELECT * FROM customer_table;`
2. Verify accountNumber column exists
3. Make sure it's NOT NULL and UNIQUE constraints are set properly

