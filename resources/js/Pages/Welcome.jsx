import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Link, Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Loading from "@/Components/Loading";
import WelcomeAnimation from "./User/WelcomeAnimation";

export default function Welcome(props) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: "",
        remember: "",
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        return () => {
            setData((prevData) => ({
                ...prevData,
                ["password"]: null,
            }));
        };
    }, []);

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        router.post(route("login"), data, {
            replace: true,
            onFinish: () => setLoading(false),
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    return (
        <>
            <Head title="WELCOME" />
            <Loading show={loading} />
            <div className="flex flex-col w-screen h-screen lg:flex-row">
                <div className="flex-[3] items-center justify-center hidden lg:flex">
                    <div className="font-mono text-center">
                        <div className="w-1/2 mx-auto">
                            <WelcomeAnimation />
                        </div>
                        <div className="text-4xl font-bold">APLIKASI PUSAT</div>
                        <div className="text-xl font-light">
                            usberdigital apps
                        </div>
                    </div>
                </div>
                <div className="flex-[2] flex items-center justify-center h-full p-5 bg-roman-500">
                    <Card className="w-full lg:max-w-sm">
                        <CardHeader>
                            <CardTitle>Selamat Datang</CardTitle>
                            <CardDescription>
                                Silahkan login dengan user yang sudah disediakan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel
                                        htmlFor="username"
                                        value="Username"
                                    />

                                    <TextInput
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        className="block w-full mt-1"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.username}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full mt-1"
                                        autoComplete="current-password"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            value={data.remember}
                                            onChange={handleOnChange}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        type="submit"
                                        className="ml-4"
                                        disabled={loading}
                                    >
                                        Log in
                                    </PrimaryButton>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between"></CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
