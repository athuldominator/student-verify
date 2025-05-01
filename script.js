// Issue a degree and save to localStorage
if (document.getElementById('issueForm')) {
  document.getElementById('issueForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const degree = {
      studentName: document.getElementById('studentName').value,
      studentId: document.getElementById('studentId').value,
      university: document.getElementById('university').value,
      course: document.getElementById('course').value,
      degreeId: document.getElementById('degreeId').value,
      issuedAt: new Date().toISOString(),
    };

    // Store by student ID
    localStorage.setItem(degree.studentId, JSON.stringify(degree));

    alert(`Degree issued for ${degree.studentName}`);
    e.target.reset();
  });
}

// Verify degree by Student ID
function verifyDegree() {
  const inputId = document.getElementById('verifyId').value.trim();
  const resultDiv = document.getElementById('verifyResult');
  resultDiv.innerHTML = '';

  const record = localStorage.getItem(inputId);

  if (record) {
    const degree = JSON.parse(record);
    resultDiv.innerHTML = `
      <h3>✅ Degree Verified</h3>
      <p><strong>Name:</strong> ${degree.studentName}</p>
      <p><strong>University:</strong> ${degree.university}</p>
      <p><strong>Course:</strong> ${degree.course}</p>
      <p><strong>Issued At:</strong> ${new Date(degree.issuedAt).toLocaleDateString()}</p>
      <button onclick="downloadCertificate('${inputId}')">Download Certificate</button>
    `;
  } else {
    resultDiv.innerHTML = `<p style="color: red;">❌ undakalle kunne YOU DONT HAVE A DEGREE!!! GO TO COLLEGE : ${inputId}</p>`;
  }
}

// Simulated certificate (basic version)
function downloadCertificate(studentId) {
  const record = JSON.parse(localStorage.getItem(studentId));

  const certWindow = window.open('', '_blank');
  certWindow.document.write(`
    <html>
    <head>
      <title>Certificate of Completion</title>
      <style>
        body {
          font-family: 'Georgia', serif;
          text-align: center;
          padding: 50px;
          background: #fdf6e3;
        }
        .certificate {
          border: 8px double #333;
          padding: 30px;
          width: 800px;
          margin: auto;
          background-color: white;
        }
        h1 {
          font-size: 40px;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 30px;
          margin: 20px 0;
        }
        .info {
          font-size: 20px;
          margin: 10px 0;
        }
        .signature {
          margin-top: 50px;
          text-align: right;
          font-style: italic;
        }
        .signature img {
          height: 50px;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <h1>Certificate of Completion</h1>
        <p class="info">This is to certify that</p>
        <h2>${record.studentName}</h2>
        <p class="info">has successfully completed the course</p>
        <h2>${record.course}</h2>
        <p class="info">at</p>
        <h2>${record.university}</h2>
        <p class="info">on ${new Date(record.issuedAt).toLocaleDateString()}</p>
	<p class="info">under the company DOMINATORS and are excepted internationally</p>

        <div class="signature">
          <p>Authorized Signature: ^DOM^</p>
          <img src="https://i.imgur.com/3YbH7Jx.png" alt="Signature" />
        </div>
      </div>
      <script>
        window.print();
      </script>
    </body>
    </html>
  `);

  certWindow.document.close();
}
