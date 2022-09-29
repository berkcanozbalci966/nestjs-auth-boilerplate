import React from "react";

function Step() {
  return (
    <li className="relative mb-6 sm:mb-0">
      <div className="flex items-center">
        <div className="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"></div>
        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
      </div>
      <div className="mt-3 sm:pr-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Flowbite Library v1.0.0
        </h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          Released on December 2, 2021
        </time>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
          Get started with dozens of web components and interactive elements.
        </p>
      </div>
    </li>
  );
}

export default Step;
