import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ExplanationPanel = ({ explanation, loading }) => {
  const [expandedSteps, setExpandedSteps] = React.useState({});

  const toggleStep = (index) => {
    setExpandedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[180px]">
        <div className="spinner" />
        <p className="mt-4 text-primary-500 font-medium animate-pulse">Analyzing code...</p>
      </div>
    );
  }

  if (!explanation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[180px]">
        <p className="text-gray-400 dark:text-gray-500 text-center">
          Write some code and click <span className="font-semibold text-primary-500">Explain & Visualize</span> to see the explanation
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-primary-600 dark:text-primary-300 mb-4 tracking-tight">
        Explanation
      </h2>
      <div className="space-y-4">
        {explanation.map((step, index) => (
          <div
  key={index}
  className={`glass border-l-4 transition-all duration-300 ${expandedSteps[index] ? 'border-primary-400' : 'border-primary-100 dark:border-primary-700'}`}
>
  <button
    onClick={() => toggleStep(index)}
    className="w-full flex justify-between items-center py-3 px-4 focus:outline-none"
    aria-expanded={expandedSteps[index]}
    aria-controls={`step-content-${index}`}
  >
    <span className="font-medium text-primary-700 dark:text-primary-200 text-left">
      Step {index + 1}: {step.t}
    </span>
    {expandedSteps[index] ? (
      <FiChevronUp className="text-primary-400" />
    ) : (
      <FiChevronDown className="text-primary-400" />
    )}
  </button>

  <div
    id={`step-content-${index}`}
    className={`overflow-hidden transition-all duration-300 ease-in-out ${
      expandedSteps[index] ? 'max-h-[500px] py-2 px-4' : 'max-h-0 py-0 px-4'
    }`}
  >
    <p className="text-gray-700 dark:text-gray-200 text-base animate-fade-in">
      {step.d}
    </p>
    {step.code && (
      <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm overflow-x-auto">
        <code>{step.code}</code>
      </pre>
    )}
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default ExplanationPanel; 