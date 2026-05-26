const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});

app.post("/login", async (req, res) => {

    try{

        const { username, mobile } = req.body;

        if(!username || !mobile){

            return res.json({
                success:false,
                message:"All fields required"
            });

        }

        const { data:user, error } = await supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .eq("mobile", mobile)
            .maybeSingle();

        if(error){

            return res.json({
                success:false,
                message:error.message
            });

        }

        if(!user){

            return res.json({
                success:false,
                message:"Invalid Login Details"
            });

        }

        return res.json({
            success:true
        });

    }catch(error){

        return res.json({
            success:false,
            message:"Server Error"
        });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On ${PORT}`);

});
