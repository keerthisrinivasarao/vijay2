app.post("/login", async (req, res) => {

    try{

        const { username, mobile } = req.body;

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
                message:"Invalid Login"
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
