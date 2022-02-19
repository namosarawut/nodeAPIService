let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// homepage route
app.get('/', (req, res) => {
    return res.send({ 
        error: false, 
        message: 'Welcome to RESTful CRUD API with NodeJS, Express, MYSQL',
        written_by: 'Sarawut'
        // published_on: 'https://milerdev.dev'
    })
})

// connection to mysql database
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'super_k'
})
dbCon.connect();

// get user data
app.get('/users', (req, res) => {
    dbCon.query('SELECT * FROM tb_user', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "Books table is empty";
        } else {
            message = "Successfully retrieved all books";
        }
        return res.send({ error: false, data: results, message: message});
    })
})

// registers
app.post('/registers', (req, res) => {
    let user_username = req.body.user_username;
    let user_password = req.body.user_password;
    let user_fname = req.body.user_fname;
    let user_lname = req.body.user_lname;
    let user_fullname = req.body.user_fullname;
    let user_phone_number = req.body.user_phone_number;
    let user_email = req.body.user_email;
    let customer_id = Math.floor(Math.random() * (1000000000 - 9999999999)) + 9999999999;
  

    // validation
    if (!user_username || !user_password || !user_fname || !user_lname  ||!user_fullname || !user_phone_number || !user_email || !customer_id ) {
        return res.status(400).send({ error: true, message: "Please provide book name and author."});
    } else {

        dbCon.query('SELECT * FROM tb_user WHERE user_username = ?', [user_username], (error, resultsuser, fields) => {
            if (error) throw error;
           // return res.send({status:"successfully", error: false, data: resultsuser})
           if(resultsuser.length > 0) {
            return res.send({ error: true,message: "username is already"})
            }else{
                dbCon.query('SELECT * FROM tb_user WHERE user_phone_number = ?', [user_phone_number], (error, resultsnumber, fields) => {
                    if (error) throw error;
                    if(resultsnumber.length > 0) {
                        return res.send({ error: true,message: "phonenumber is already"})
                    }else{
                        dbCon.query('SELECT * FROM tb_user WHERE user_email = ?', [user_email], (error, resultsemail, fields) => {
                            if (error) throw error;
                            if(resultsemail.length > 0) {
                                return res.send({ error: true,message: "email is already"})
                            }else{
                                dbCon.query('INSERT INTO tb_user (user_username, user_password,user_fname,user_lname,user_fullname, user_phone_number,user_email,customer_id) VALUES(?,?,?,?,?,?,?,?)', [user_username, user_password,user_fname,user_lname,user_fullname, user_phone_number,user_email,customer_id], (error, resultsrespon, fields) => {
                                    if (error) throw error;
                                    return res.send({ error: false, data: resultsrespon, message: "register successfully"})
                                })
                            }
                        })
                    }
    
                })
            }

        })
      
    }
});

app.post('/checkphonumber', (req, res) => {
    let user_phone_number = req.body.user_phone_number;
    // validation
    if (!user_phone_number ) {
        return res.status(400).send({ error: true, message: "Please provide phonenumber."});
    } else {
        dbCon.query('SELECT * FROM tb_user WHERE user_phone_number = ?', [user_phone_number], (error, results, fields) => {
            if (error) throw error;
            if(results.length > 0){
                return res.send({status:true, error: true, message: "phonenumber is already" })
            }else {
                
                return res.send({status:true, error: false})
            }
           
        })
    }
});


 app.post('/login', (req, res) => {
    let user_username = req.body.user_username;
    let user_password = req.body.user_password;
    // validation
    if (!user_username || !user_password) {
        return res.status(400).send({ error: true, message: "Please provide book name and author."});
    } else {

        dbCon.query('SELECT * FROM tb_user WHERE user_username = ? AND user_password = ?', [user_username, user_password], (error, results, fields) => {
            if (error) throw error;
            if(results.length > 0){
                return res.send({status:true, error: false, data: results})
            }else {
                
                return res.send({status:false, error: true})
            }
           
        })
    }
});



// retrieve book by id 
app.get('/book/:id', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide book id"});
    } else {
        dbCon.query("SELECT * FROM books WHERE id = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "Book not found";
            } else {
                message = "Successfully retrieved book data";
            }

            return res.send({ error: false, data: results[0], message: message })
        })
    }
})

// update book with id 
app.put('/book', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;

    // validation
    if (!id || !name || !author) {
        return res.status(400).send({ error: true, message: 'Please provide book id, name and author'});
    } else {
        dbCon.query('UPDATE books SET name = ?, author = ? WHERE id = ?', [name, author, id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.changedRows === 0) {
                message = "Book not found or data are same";
            } else {
                message = "Book successfully updated";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

// delete book by id
app.delete('/book', (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({ error: true, message: "Please provide book id"});
    } else {
        dbCon.query('DELETE FROM books WHERE id = ?', [id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.affectedRows === 0) {
                message = "Book not found";
            } else {
                message = "Book successfully deleted";
            }

            return res.send({ error: false, data: results, message: message })
        })
    }
})

app.listen(3000, () => {
    console.log('Node App is running on port 3000');
})

module.exports = app;