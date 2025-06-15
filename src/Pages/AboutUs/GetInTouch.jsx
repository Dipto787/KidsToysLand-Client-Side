import React from "react";

const GetInTouch = () => {
    return (
        <section className=" mx-auto bg-blue-50  p-8  font-comic select-none my-12 text-blue-900">
            <h2 className="text-center text-3xl mb-6 font-bold drop-shadow-sm flex items-center justify-center gap-2">
                <span>🤝</span> Get in Touch
            </h2>

            <p className="mb-4 text-center text-lg">
                Have questions or suggestions? Want to share your child’s toy story with us? <br />
                <strong>We’d love to hear from you!</strong>
            </p>

            <div className="space-y-3 mb-6 text-blue-800">
                <p>
                    <span className="mr-2 text-xl">📧</span>
                    <a href="mailto:support@kidstoysland.com" className="underline hover:text-blue-600">
                        support@kidstoysland.com
                    </a>
                </p>
                <p>
                    <span className="mr-2 text-xl">📍</span> Dhaka, Bangladesh
                </p>
                <p>
                    <span className="mr-2 text-xl">📱</span> Follow us on social media:{" "}
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                        Facebook
                    </a>{" "}
                    |{" "}
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-500 hover:underline">
                        Instagram
                    </a>{" "}
                    |{" "}
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-red-600 hover:underline">
                        YouTube
                    </a>
                </p>
            </div>

            <p className="text-center text-xl font-semibold text-blue-700">
                🎉 Thank You for Being Here!<br />
                We’re thrilled to have you as part of the KidsToysLand family.<br />
                Let's build a world of happy playtimes — one toy at a time.
            </p>
        </section>
    );
};

export default GetInTouch;
