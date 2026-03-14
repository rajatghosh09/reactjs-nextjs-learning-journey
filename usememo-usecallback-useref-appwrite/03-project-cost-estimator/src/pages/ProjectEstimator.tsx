import React, { useState, useMemo, useCallback } from 'react';
import FormField from './FormField';
import type{ FormData } from '../types/formTypes';

const ProjectEstimator = () => {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    clientName: '',
    hourlyRate: 0,
    hoursEstimated: 0,
    softwareCost: 0,
    marketingBudget: 0,
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert('Form Submitted! Check console for data.');
    console.log(formData);
  }, [formData]);


  const totalCost = useMemo(() => {
    console.log('Calculating Total Cost...');
    const labor = formData.hourlyRate * formData.hoursEstimated;
    const overhead = formData.softwareCost + formData.marketingBudget;
    return labor + overhead;
  }, [formData.hourlyRate, formData.hoursEstimated, formData.softwareCost, formData.marketingBudget]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
        Project Estimator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Project Name"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
          <FormField
            label="Client Name"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
          />

          <FormField
            label="Hourly Rate ($)"
            name="hourlyRate"
            type="number"
            value={formData.hourlyRate}
            onChange={handleChange}
          />
          <FormField
            label="Hours Estimated"
            name="hoursEstimated"
            type="number"
            value={formData.hoursEstimated}
            onChange={handleChange}
          />
          <FormField
            label="Software Costs ($)"
            name="softwareCost"
            type="number"
            value={formData.softwareCost}
            onChange={handleChange}
          />
          <FormField
            label="Marketing Budget ($)"
            name="marketingBudget"
            type="number"
            value={formData.marketingBudget}
            onChange={handleChange}
          />
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl flex justify-between items-center border border-blue-100">
          <div>
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
              Total Estimated Cost
            </p>
            <p className="text-xs text-blue-400 mt-1">
              (Labor + Overhead)
            </p>
          </div>
          <div className="text-4xl font-bold text-blue-800">
            ${totalCost.toLocaleString()}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-lg"
        >
          Submit Estimate
        </button>
      </form>
    </div>
  );
};

export default ProjectEstimator;
