"use client"

import z from "zod";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signUpSchema = z.object({
    name: z.string().min(1),
    email: z.email().min(1),
    password: z.string().min(6)
});

type SignUpForm = z.infer<typeof signUpSchema>;

async function handleSignUp(data: SignUpForm) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
}

export function SignUpTab() {
    const form = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const { isSubmitting } = form.formState;

    return (
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUp)}>
            <FieldGroup>
                <Controller 
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Name
                            </FieldLabel>
                            <Input 
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                {...field} 
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller 
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Email
                            </FieldLabel>
                            <Input 
                                type="email"
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                {...field} 
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
                <Controller 
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Password
                            </FieldLabel>
                            <Input 
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                {...field} 
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button type="submit">
                {isSubmitting && <p>Loading...</p>}
                Sign Up
            </Button>
        </form>
    );
}