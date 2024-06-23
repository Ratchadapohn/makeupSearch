import { Container, Box, Grid, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type formValue = {
  username: string;
  password: number;
};
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValue>();
  const [data, setData] = useState({ username: "", password: "" });
  const onsubmit: SubmitHandler<formValue> = (data) => {
    console.log("final data is", data);
  };
  return (
    <div>
      <Container>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <form onSubmit={handleSubmit(onsubmit)}>
                <h1>login</h1>
                <TextField
                  label="username"
                  placeholder="enter email"
                  {...register("username", {
                    required: "username is required!",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "invalid email!",
                    },
                  })}
                />
                {errors.username && <p>{errors.username.message}</p>}
                <TextField
                  label="password"
                  type="password"
                  placeholder="enter password!"
                  {...register("password", {
                    required: "password is required!",
                    minLength: {
                      value: 9,
                      message: "password atleast 9 chars!",
                    },
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <Button type="submit">submit</Button>
              </form>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
