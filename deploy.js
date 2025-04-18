const fs = require('fs');
const { execSync } = require('child_process');

// STEP 1: Remove problematic project
console.log('Preparing for deployment...');

// Backup original projects.ts file
try {
  const projectsData = fs.readFileSync('./data/projects.ts', 'utf8');
  fs.writeFileSync('./data/projects.ts.backup', projectsData);
  console.log('✅ Projects data backed up');
} catch (err) {
  console.error('❌ Error backing up projects data:', err);
  process.exit(1);
}

// Modify projects.ts to remove problematic projects for the build
try {
  let projectsData = fs.readFileSync('./data/projects.ts', 'utf8');
  
  // Filter out the specific projects causing issues
  projectsData = projectsData.replace(
    /\s*\{\s*id:\s*1,[\s\S]*?\},/,
    `  {
    id: 1,
    title: "Pixelated Image Detection (Build Version)",
    slug: "pixelated-image-detection",
    description: "Machine learning solution using CNNs to detect and enhance pixelated image regions.",
    longDescription: "This is a placeholder during build.",
    featuredImage: "/placeholder.svg",
    category: "ai",
    technologies: ["Python", "TensorFlow", "CNN"],
    demoLink: "https://github.com/kovendhan5/intel-project",
    githubLink: "https://github.com/kovendhan5/intel-project",
    date: "Apr 2024 - Jul 2024",
  },`
  );

  projectsData = projectsData.replace(
    /\s*\{\s*id:\s*3,[\s\S]*?\},/,
    `  {
    id: 3,
    title: "Student Code Sharing (Build Version)",
    slug: "student-code-sharing",
    description: "Platform for students to share programming code.",
    longDescription: "This is a placeholder during build.",
    featuredImage: "/placeholder.svg",
    category: "web",
    technologies: ["JavaScript", "Google Apps Script"],
    demoLink: "#",
    githubLink: "#",
    date: "Jun 2024",
  },`
  );

  fs.writeFileSync('./data/projects.ts', projectsData);
  console.log('✅ Projects data modified for build');
} catch (err) {
  console.error('❌ Error modifying projects data:', err);
  process.exit(1);
}

// STEP 2: Build the project
try {
  console.log('Building the portfolio site...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (err) {
  console.error('❌ Build failed:', err);
  
  // Restore original projects.ts file
  try {
    fs.copyFileSync('./data/projects.ts.backup', './data/projects.ts');
    console.log('✅ Projects data restored from backup');
  } catch (restoreErr) {
    console.error('❌ Error restoring projects data:', restoreErr);
  }
  
  process.exit(1);
}

// STEP 3: Deploy to Firebase
try {
  console.log('Deploying to Firebase...');
  execSync('firebase deploy', { stdio: 'inherit' });
  console.log('✅ Successfully deployed to Firebase!');
} catch (err) {
  console.error('❌ Firebase deployment failed:', err);
  process.exit(1);
}

// STEP 4: Restore original projects.ts file
try {
  fs.copyFileSync('./data/projects.ts.backup', './data/projects.ts');
  console.log('✅ Projects data restored from backup');
} catch (restoreErr) {
  console.error('❌ Error restoring projects data:', restoreErr);
}

console.log('🎉 Deployment process completed!');