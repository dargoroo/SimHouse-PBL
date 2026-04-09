export type Role = 'Project Manager' | 'System Analyst' | 'UI/UX Designer' | 'Frontend Developer' | 'Backend Developer' | 'QA / Tester' | 'DevOps';

export type TaskStatus = 'To Do' | 'Working on it' | 'Stuck' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface EvidenceLink {
  type: 'github' | 'figma' | 'doc' | 'other';
  url: string;
  label: string;
}

export interface Task {
  id: string;
  title: string;
  assignees: string[];
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  dueDate: string;
  progress: number;
  evidenceLinks?: EvidenceLink[];
}

export interface Student {
  id: string;
  name: string;
  role: Role;
  avatarUrl: string;
  skills: {
    technical: number;
    process: number;
    communication: number;
    problemSolving: number;
    teamwork: number;
    responsibility: number;
  };
  reportEvidence: {
    technical: string;
    process: string;
    soft: string;
    peer: string;
  };
}

export interface Company {
  id: string;
  name: string;
  slogan: string;
  culture: string;
  members: Student[];
  project: string;
  progress: number;
  tasks: Task[];
}

export const mockCompanies: Company[] = [
  {
    id: 'c1',
    name: 'NexusTech Solutions',
    slogan: 'Innovating the Future, One Line at a Time',
    culture: 'Agile, Collaborative, and User-Centric',
    project: 'Hospital Queue Management System',
    progress: 65,
    tasks: [
      { 
        id: 't1', title: 'Design Database Schema', assignees: ['s2'], status: 'Done', priority: 'High', startDate: '2023-09-01', dueDate: '2023-09-10', progress: 100,
        evidenceLinks: [{ type: 'doc', url: '#', label: 'Schema.pdf' }]
      },
      { 
        id: 't2', title: 'Create UI Wireframes', assignees: ['s3'], status: 'Done', priority: 'Medium', startDate: '2023-09-03', dueDate: '2023-09-12', progress: 100,
        evidenceLinks: [{ type: 'figma', url: '#', label: 'Figma Prototype' }]
      },
      { 
        id: 't3', title: 'Develop Patient Registration API', assignees: ['s5'], status: 'Working on it', priority: 'Critical', startDate: '2023-09-10', dueDate: '2023-09-20', progress: 65,
        evidenceLinks: [{ type: 'github', url: '#', label: 'PR #42' }]
      },
      { id: 't4', title: 'Implement Queue Dashboard UI', assignees: ['s4'], status: 'Working on it', priority: 'High', startDate: '2023-09-12', dueDate: '2023-09-22', progress: 40 },
      { id: 't5', title: 'Setup CI/CD Pipeline', assignees: ['s1'], status: 'Stuck', priority: 'Medium', startDate: '2023-09-15', dueDate: '2023-09-18', progress: 15 },
      { id: 't6', title: 'Write E2E Tests for Registration', assignees: ['s6'], status: 'To Do', priority: 'Low', startDate: '2023-09-20', dueDate: '2023-09-25', progress: 0 },
    ],
    members: [
      { 
        id: 's1', name: 'Alex Chen', role: 'Project Manager', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
        skills: { technical: 70, process: 95, communication: 90, problemSolving: 85, teamwork: 90, responsibility: 95 },
        reportEvidence: { technical: 'วางแผน Sprint ได้ดี แต่ขาดความเข้าใจเชิงลึกใน CI/CD', process: 'อัปเดต Jira สม่ำเสมอ', soft: 'สื่อสารกับทีมได้ดีมาก', peer: 'เพื่อนโหวตให้เป็นผู้นำที่ดี' }
      },
      { 
        id: 's2', name: 'Sarah Johnson', role: 'System Analyst', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        skills: { technical: 90, process: 85, communication: 80, problemSolving: 95, teamwork: 85, responsibility: 90 },
        reportEvidence: { technical: 'ออกแบบ Database Schema ได้ครอบคลุม (Approved)', process: 'ส่งเอกสารตรงเวลา', soft: 'อธิบาย Requirements ให้ Dev เข้าใจได้ดี', peer: 'ทำงานละเอียด' }
      },
      { 
        id: 's3', name: 'Mike Ross', role: 'UI/UX Designer', avatarUrl: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
        skills: { technical: 85, process: 80, communication: 85, problemSolving: 75, teamwork: 90, responsibility: 85 },
        reportEvidence: { technical: 'Figma Prototype สวยงามและใช้งานง่าย', process: 'ทำ Usability Test ตามแผน', soft: 'รับฟัง Feedback จากทีม', peer: 'ออกแบบได้ตรงใจลูกค้า' }
      },
      { 
        id: 's4', name: 'Emily Davis', role: 'Frontend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
        skills: { technical: 88, process: 75, communication: 80, problemSolving: 85, teamwork: 85, responsibility: 80 },
        reportEvidence: { technical: 'ความคืบหน้า Task (6/6), ลิงก์ GitHub มีการ Push สม่ำเสมอ', process: 'รับผิดชอบเอกสาร SRS (Approved), อัปเดตสถานะงานทุกวัน', soft: 'การสื่อสารในทีม, ความเร็วในการตอบสนองต่อ Change Request', peer: 'เพื่อนในทีมประเมิน: "รับผิดชอบงานดีมาก ช่วยเหลือเพื่อนเสมอ"' }
      },
      { 
        id: 's5', name: 'David Kim', role: 'Backend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024e',
        skills: { technical: 95, process: 80, communication: 70, problemSolving: 90, teamwork: 80, responsibility: 85 },
        reportEvidence: { technical: 'API ทำงานได้รวดเร็วและปลอดภัย', process: 'บางครั้งลืมอัปเดต Task Board', soft: 'สื่อสารน้อย แต่ตอบคำถามตรงประเด็น', peer: 'เขียนโค้ดเก่งมาก' }
      },
      { 
        id: 's6', name: 'Lisa Wong', role: 'QA / Tester', avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
        skills: { technical: 80, process: 90, communication: 85, problemSolving: 80, teamwork: 95, responsibility: 90 },
        reportEvidence: { technical: 'เขียน Test Case ครอบคลุม Edge Cases', process: 'รายงาน Bug ได้ชัดเจน', soft: 'แจ้ง Bug ให้ Dev แก้ไขด้วยความสุภาพ', peer: 'ช่วยหาข้อผิดพลาดได้เยอะมาก' }
      },
    ]
  },
  {
    id: 'c2',
    name: 'CodeCrafters SME',
    slogan: 'Building robust tools for small businesses',
    culture: 'Pragmatic, Fast-paced, Quality First',
    project: 'SME Inventory Management System',
    progress: 40,
    tasks: [
      { id: 't7', title: 'Requirements Gathering', assignees: ['s8'], status: 'Done', priority: 'High', startDate: '2023-09-01', dueDate: '2023-09-05', progress: 100 },
      { id: 't8', title: 'Inventory API Endpoints', assignees: ['s11'], status: 'Working on it', priority: 'High', startDate: '2023-09-05', dueDate: '2023-09-24', progress: 40 },
      { id: 't9', title: 'Frontend Product List', assignees: ['s10'], status: 'To Do', priority: 'Medium', startDate: '2023-09-15', dueDate: '2023-09-26', progress: 0 },
    ],
    members: [
      { 
        id: 's7', name: 'James Wilson', role: 'Project Manager', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026703d',
        skills: { technical: 60, process: 85, communication: 80, problemSolving: 70, teamwork: 85, responsibility: 80 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's8', name: 'Maria Garcia', role: 'System Analyst', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        skills: { technical: 80, process: 80, communication: 85, problemSolving: 80, teamwork: 80, responsibility: 85 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's9', name: 'Tom Hardy', role: 'UI/UX Designer', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
        skills: { technical: 75, process: 70, communication: 75, problemSolving: 70, teamwork: 80, responsibility: 75 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's10', name: 'Anna Lee', role: 'Frontend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
        skills: { technical: 85, process: 75, communication: 80, problemSolving: 85, teamwork: 85, responsibility: 80 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's11', name: 'Chris Evans', role: 'Backend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
        skills: { technical: 80, process: 70, communication: 75, problemSolving: 80, teamwork: 75, responsibility: 80 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's12', name: 'Rachel Green', role: 'QA / Tester', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
        skills: { technical: 70, process: 80, communication: 85, problemSolving: 75, teamwork: 85, responsibility: 85 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
    ]
  },
  {
    id: 'c3',
    name: 'CampusConnect',
    slogan: 'Connecting students through knowledge',
    culture: 'Community-driven, Open Source mindset',
    project: 'University Textbook Exchange Platform',
    progress: 80,
    tasks: [
      { id: 't10', title: 'User Authentication', assignees: ['s17'], status: 'Done', priority: 'Critical', startDate: '2023-09-01', dueDate: '2023-09-08', progress: 100 },
      { id: 't11', title: 'Book Listing UI', assignees: ['s16'], status: 'Done', priority: 'High', startDate: '2023-09-05', dueDate: '2023-09-15', progress: 100 },
      { id: 't12', title: 'Search & Filter Logic', assignees: ['s17', 's16'], status: 'Working on it', priority: 'High', startDate: '2023-09-12', dueDate: '2023-09-22', progress: 70 },
      { id: 't13', title: 'Chat System Prototype', assignees: ['s15'], status: 'To Do', priority: 'Medium', startDate: '2023-09-20', dueDate: '2023-09-28', progress: 0 },
    ],
    members: [
      { 
        id: 's13', name: 'Kevin Hart', role: 'Project Manager', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026710d',
        skills: { technical: 75, process: 90, communication: 95, problemSolving: 85, teamwork: 95, responsibility: 90 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's14', name: 'Olivia Munn', role: 'System Analyst', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026711d',
        skills: { technical: 85, process: 85, communication: 90, problemSolving: 85, teamwork: 90, responsibility: 85 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's15', name: 'Steve Jobs', role: 'UI/UX Designer', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026712d',
        skills: { technical: 95, process: 85, communication: 95, problemSolving: 95, teamwork: 85, responsibility: 90 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's16', name: 'Bill Gates', role: 'Frontend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026713d',
        skills: { technical: 95, process: 90, communication: 85, problemSolving: 95, teamwork: 90, responsibility: 95 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's17', name: 'Elon Musk', role: 'Backend Developer', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026714d',
        skills: { technical: 98, process: 80, communication: 80, problemSolving: 98, teamwork: 80, responsibility: 85 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
      { 
        id: 's18', name: 'Ada Lovelace', role: 'QA / Tester', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026715d',
        skills: { technical: 95, process: 95, communication: 90, problemSolving: 95, teamwork: 95, responsibility: 98 },
        reportEvidence: { technical: 'N/A', process: 'N/A', soft: 'N/A', peer: 'N/A' }
      },
    ]
  }
];

export const mockSprints = [
  {
    id: 'sp1',
    name: 'Sprint 1: Core Features',
    status: 'Completed',
    startDate: '2023-09-01',
    endDate: '2023-09-14',
  },
  {
    id: 'sp2',
    name: 'Sprint 2: User Authentication & Dashboard',
    status: 'Active',
    startDate: '2023-09-15',
    endDate: '2023-09-28',
  },
  {
    id: 'sp3',
    name: 'Sprint 3: Advanced Features & Testing',
    status: 'Planning',
    startDate: '2023-09-29',
    endDate: '2023-10-12',
  }
];
