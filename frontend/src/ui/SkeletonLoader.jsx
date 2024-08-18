// SkeletonLoader.js
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ columns }) => {
  return (
    <tbody>
      <tr>
        {columns.map((_, index) => (
          <td key={index} className="p-2 py-3">
            <Skeleton height={20} />
          </td>
        ))}
        <td className="p-2"></td>
      </tr>
      <tr>
        {columns.map((_, index) => (
          <td key={index} className="p-2 py-3">
            <Skeleton height={20} />
          </td>
        ))}
        <td className="p-2"></td>
      </tr>{" "}
      <tr>
        {columns.map((_, index) => (
          <td key={index} className="p-2 py-3">
            <Skeleton height={20} />
          </td>
        ))}
        <td className="p-2"></td>
      </tr>
      <tr>
        {columns.map((_, index) => (
          <td key={index} className="p-2 py-3">
            <Skeleton height={20} />
          </td>
        ))}
        <td className="p-2"></td>
      </tr>
    </tbody>
  );
};

export default SkeletonLoader;
