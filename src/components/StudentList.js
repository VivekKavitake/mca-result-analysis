import React, { useState, useEffect } from 'react';
import '../styles/StudentList.css';
import Papa from 'papaparse';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // state for sort order

  let serialNumber = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mca_results.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result.value);
        const { data } = Papa.parse(csv, { header: true });
        setStudents(data);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedStudents = students
    .filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.rank - b.rank;
      } else if (sortOrder === 'desc') {
        return b.rank - a.rank;
      } else {
        return 0; // no sorting
      }
    });

  return (
    <div>
      <div className='student-list-container'>
  <h2 className='h2'>Student List</h2>
  <div className='controls'>
    <input
      type='text'
      placeholder='Search by name'
      value={searchQuery}
      onChange={handleSearchChange}
      className='search-box'
    />
    <select value={sortOrder} onChange={handleSortChange} className='sort-dropdown'>
      <option value=''>Sort</option>
      <option value='asc'>Ascending</option>
      <option value='desc'>Descending</option>
    </select>
  </div>
</div>

      <table className='table'>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>SGPA</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.length > 0 ? (
            sortedStudents.map((student, index) => (
              <tr key={index}>
                <td>{++serialNumber}</td>
                <td>{student.name}</td>
                <td>{student.sgpa}</td>
                <td>{student.rank}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
