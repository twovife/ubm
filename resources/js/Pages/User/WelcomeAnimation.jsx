import React, { Suspense, lazy } from "react";

const Lottie = lazy(() => import("lottie-react"));
const animationDataPromise = import("/storage/Animation.json");

const WelcomeAnimation = () => {
    const [animationData, setAnimationData] = React.useState(null);

    React.useEffect(() => {
        animationDataPromise.then((module) => {
            setAnimationData(module.default || module);
        });
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {animationData ? (
                <Lottie animationData={animationData} loop={true} />
            ) : (
                <div>Loading animation...</div>
            )}
        </Suspense>
    );
};

export default WelcomeAnimation;
