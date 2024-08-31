import express from 'express';
import { Query, QueryResult } from 'pg';
import { pool, connectionToDb } from './connection';

await connectionToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//read all departments
app.get('/api/department', async (_req, res) => {
    try {
      const { rows }: QueryResult = await pool.query('SELECT * FROM department');
      res.json(rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).end();
    }
});

//read all rolls
app.get('/api/role', async (req, res) => {
    try {
        const { rows }: QueryResult = await pool.query('SELECT * FROM role');
        res.json(rows);
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).end();
    }
});

//read all employees
app.get('/api/employee', async (_req, res) => {
    try {
      const { rows }: QueryResult = await pool.query('SELECT * FROM employee');
      res.json(rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).end();
    }
});


//add a new department
app.post('/api/department', async (req, res) => { 
    const sql = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
    const params = [req.body.name];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        } 
            res.json({
                message: 'Department added successfully',
                department: result.rows[0]
            });
        });
});

//add a new role
app.post('/api/role', async (req, res) => { 
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
    const params = [req.body.title, req.body.salary, req.body.department_id];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        } 
            res.json({
                message: 'Role added successfully',
                role: result.rows[0]
            });
        });
});

//add a new employee
app.post('/api/employee', async (req, res) => {
    const sql = 'INSERT INTO employee (name, department_id) VALUES ($1, $2) RETURNING *';
    const params = [req.body.name, req.body.department_id];

    pool.query(sql, params, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'Employee added successfully',
            employee: result.rows[0]
        });
    });
});

//update an employee's role
app.put('/api/employee/:id', async (req, res) => {
    const sql = 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *';
    const params = [req.body.role_id, req.params.id];

    pool.query(sql, params, (err: Error, result: QueryResult) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.rows.length) {
            res.status(404).json({ error: 'Employee not found' });
        } else {
        res.json({
            message: 'Employee updated successfully',
            employee: result.rows[0]
        });
    }
    });
});



// Default response for any other request (Not Found)
app.use((_req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });