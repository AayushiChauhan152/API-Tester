import React from "react";
import RequestComp from "./RequestComp";
import Footer from "./Footer";

function ApiTester() {
  return (
    <div className="min-h-screen bg-secondary font-grotesk">
      <header className="bg-secondary-light border-b border-gray-800">
        <div className="max-w-7xl mx-auto  px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">API Tester</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-4">
              <RequestComp />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-secondary-light border-t border-gray-800 py-6 mt-12 fixed w-full bottom-0">
        <Footer />
      </footer>
    </div>
  );
}

export default ApiTester;
