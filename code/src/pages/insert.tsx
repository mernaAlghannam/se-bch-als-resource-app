import { useState } from "react";

const Insert = () => {
    const [data, setData] = useState({
        name: "",
        age: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       try {
        const response = await fetch("http://localhost:3000/api/insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const result = await response.json();
        console.log(result);

        if (result.status === "success") {
            alert("Data inserted successfully!");
        }

        setData({ name: "", age: "" });
       } catch (error) {
              console.log(error);
         }
    }

}