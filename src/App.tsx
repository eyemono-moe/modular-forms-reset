import {
  SubmitHandler,
  createForm,
  getValues,
  reset,
} from "@modular-forms/solid";
import { Show, createSignal } from "solid-js";

type LoginForm = {
  email: string;
  password: string;
};

function App() {
  const [loginForm, { Form, Field }] = createForm<LoginForm>({
    initialValues: {
      email: "initial email",
      password: "initial password",
    },
  });

  // hide password by default
  const [showPassword, setShowPassword] = createSignal(false);

  const handleSubmit: SubmitHandler<LoginForm> = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const handleReset = () => {
    reset(loginForm, {
      initialValues: {
        email: "reset email",
        password: "reset password",
      },
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field name="email">
          {(field, props) => (
            <label>
              email
              <input value={field.value || ""} {...props} type="email" />
            </label>
          )}
        </Field>

        <Show when={showPassword()}>
          <Field name="password">
            {(field, props) => (
              <label>
                password
                <input value={field.value || ""} {...props} />
              </label>
            )}
          </Field>
        </Show>

        <button onClick={handleReset} type="button">
          Reset
        </button>
        <button type="submit">Submit</button>

        <label>
          <input
            type="checkbox"
            checked={showPassword()}
            onChange={(e) => setShowPassword(e.currentTarget.checked)}
          />
          show password
        </label>
      </Form>

      <pre>
        <code>
          {`getValues(loginForm, { shouldActive: false }) = ${JSON.stringify(
            getValues(loginForm, { shouldActive: false }),
            null,
            2
          )}`}
        </code>
      </pre>
    </>
  );
}

export default App;
