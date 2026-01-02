import React from "react";

export const metadata = {
  title: "Capybara Run!",
  description: "2D side-scrolling runner game built with JavaScript and HTML.",
};

const MyGamePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl aspect-video rounded-lg overflow-hidden shadow-lg border-4 border-orange-400">
        <iframe
          src="/capybara-game/index.html"
          title="Capybara Run!"
          className="w-full h-full"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </main>
  );
};

export default MyGamePage;
