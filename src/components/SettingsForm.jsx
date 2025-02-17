import React from "react";

function SettingsForm({ settings, setSettings }) {
  return (
    <div className="container text-center">
      <h3 className="text-secondary">Customize Your Quiz</h3>

      <div className="mt-3">
        <label className="form-label">Select Category:</label>
        <select
          className="form-select"
          value={settings.category}
          onChange={(e) => setSettings({ ...settings, category: e.target.value })}
        >
          <option value="9">General Knowledge</option>
          <option value="17">Science & Nature</option>
          <option value="23">History</option>
          <option value="21">Sports</option>
          <option value="27">Animals</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="form-label">Select Difficulty:</label>
        <select
          className="form-select"
          value={settings.difficulty}
          onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="form-label">Number of Questions:</label>
        <input
          type="number"
          className="form-control"
          value={settings.amount}
          min="1"
          max="20"
          onChange={(e) => setSettings({ ...settings, amount: e.target.value })}
        />
      </div>
    </div>
  );
}

export default SettingsForm;
