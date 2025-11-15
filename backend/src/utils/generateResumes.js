import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create resumes directory if it doesn't exist
const resumesDir = path.join(__dirname, "../public/resumes");
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
  console.log("Created resumes directory");
}

const applicantNames = [
  "Grace Hayes",
  "Roland MacGyver",
  "Myrtle Bergnaum",
  "Jackie Runolfsson",
  "Nichole Smith",
  "Carroll Streich",
  "Yolanda Howell",
  "Carroll Armstrong",
  "Marion Lesch",
  "Sophia Schmidt",
  "Ginger Waters",
  "Desiree Beahan",
  "Nadine Hoppe",
  "Charlie Larkin",
  "Glen Greenfelder",
];

function generateResume(name, filename) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const outputPath = path.join(resumesDir, filename);
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // Header
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text(name, { align: "center" })
      .moveDown(0.5);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Email: " + name.toLowerCase().replace(" ", ".") + "@example.com", {
        align: "center",
      })
      .text(
        "Phone: (555) " +
          Math.floor(Math.random() * 900 + 100) +
          "-" +
          Math.floor(Math.random() * 9000 + 1000),
        {
          align: "center",
        }
      )
      .text(
        "LinkedIn: linkedin.com/in/" + name.toLowerCase().replace(" ", "-"),
        {
          align: "center",
        }
      )
      .moveDown(1);

    // Professional Summary
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("PROFESSIONAL SUMMARY")
      .moveDown(0.3);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        "Experienced professional with 5+ years in software development. Proven track record of delivering high-quality solutions and leading cross-functional teams. Passionate about innovation and continuous learning.",
        { align: "justify" }
      )
      .moveDown(1);

    // Skills
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("TECHNICAL SKILLS")
      .moveDown(0.3);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("• Programming Languages: JavaScript, Python, Java, TypeScript")
      .text("• Frontend: React, Vue.js, Angular, HTML5, CSS3, Tailwind CSS")
      .text("• Backend: Node.js, Express, Django, Spring Boot")
      .text("• Databases: MySQL, PostgreSQL, MongoDB, Redis")
      .text("• Tools: Git, Docker, Kubernetes, AWS, CI/CD")
      .moveDown(1);

    // Experience
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("PROFESSIONAL EXPERIENCE")
      .moveDown(0.3);

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("Senior Software Engineer | Tech Corp Inc.")
      .fontSize(9)
      .font("Helvetica-Oblique")
      .text("January 2021 - Present")
      .moveDown(0.3);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("• Led development of microservices architecture serving 1M+ users")
      .text("• Improved application performance by 40% through optimization")
      .text("• Mentored junior developers and conducted code reviews")
      .text("• Implemented CI/CD pipelines reducing deployment time by 60%")
      .moveDown(0.8);

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("Software Engineer | Innovation Labs")
      .fontSize(9)
      .font("Helvetica-Oblique")
      .text("June 2019 - December 2020")
      .moveDown(0.3);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("• Developed RESTful APIs using Node.js and Express")
      .text("• Built responsive web applications with React and Redux")
      .text("• Collaborated with designers to implement pixel-perfect UIs")
      .text("• Participated in agile development and sprint planning")
      .moveDown(1);

    // Education
    doc.fontSize(14).font("Helvetica-Bold").text("EDUCATION").moveDown(0.3);

    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text("Bachelor of Science in Computer Science")
      .fontSize(10)
      .font("Helvetica")
      .text("University of Technology, 2019")
      .text("GPA: 3.8/4.0")
      .moveDown(1);

    // Certifications
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("CERTIFICATIONS")
      .moveDown(0.3);

    doc
      .fontSize(10)
      .font("Helvetica")
      .text("• AWS Certified Solutions Architect")
      .text("• Google Cloud Professional Developer")
      .text("• Certified Kubernetes Administrator");

    doc.end();

    stream.on("finish", () => {
      console.log(`✅ Generated resume: ${filename}`);
      resolve(outputPath);
    });

    stream.on("error", reject);
  });
}

async function generateAllResumes() {
  console.log("Generating sample resumes...\n");

  for (let i = 0; i < applicantNames.length; i++) {
    const name = applicantNames[i];
    const filename = `resume_${i + 1}.pdf`;
    await generateResume(name, filename);
  }

  console.log(
    `\n✅ Generated ${applicantNames.length} resume PDFs in ${resumesDir}`
  );
  console.log(
    "These resumes can be accessed via: http://localhost:3001/resumes/resume_X.pdf"
  );
}

generateAllResumes().catch((error) => {
  console.error("Error generating resumes:", error);
  process.exit(1);
});
