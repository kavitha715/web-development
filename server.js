const e = require("express");
const express = require("express");
//const math = require("mathjs");
const app = express();
const port = 3000;

const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./serviceAccountKey.json");
initializeApp({
	credential: cert(serviceAccount),
});
const db = getFirestore();

app.set("view engine","ejs");
app.use(express.static('public'));

app.get("/",(req,res)=>{
	res.send("Hello!!! Welcome to FASHION STORE WEBSITE...");
});

app.get("/shopping",(req,res)=>{
	res.render("shopping");
});

app.get("/shoppingSubmit", (req,res) => {
	res.render("shopping");
})

app.get("/signup",(req,res)=>{
	res.render("signup");
});

app.get("/signupSubmit",(req,res)=>{
	const name = req.query.name;
	const email = req.query.email;
	const phone = req.query.phone;
	const password = req.query.password;
	db.collection("Users").add({
		Name : name,
		Email : email,
		PhoneNumber : phone,
		Password : password,
	}).then(()=>{
		res.render("login");
	});
});


app.get("/men",(req,res)=>{
	res.render("men");
});
app.get("/women",(req,res)=>{
	res.render("women");
});
app.get("/login",(req,res)=>{
	res.render("login");
});

app.get("/loginSubmit",(req,res)=>{
	const Email_ = req.query.email;
	const Password_ = req.query.password;
	db.collection("Users")
	.where("Email","==",Email_)
	.where("Password","==",Password_)
	.get()
	.then((docs) => {
		if(docs.size > 0){
			res.render("shopping");
		}
		else{
			res.render("signup");
		}
	});
});


app.listen(port,()=>{
	console.log(`Server is running on Port Number: http://localhost:${port}`);
});