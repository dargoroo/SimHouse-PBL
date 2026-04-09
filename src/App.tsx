import { useState } from 'react';
import { Building2, Users, LayoutDashboard, ClipboardCheck, Settings, Bell, Search, Save, KanbanSquare, ListTodo, CalendarDays, MoreHorizontal, Plus, Calendar as CalendarIcon, Clock, Github, Figma, FileText, Link as LinkIcon, Sparkles, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { mockCompanies, Company, mockSprints, Task, TaskStatus, TaskPriority, Student } from './data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const renderContent = () => {
    if (selectedCompany) {
      return <CompanyDetail company={selectedCompany} onBack={() => setSelectedCompany(null)} />;
    }

    switch (activeTab) {
      case 'overview':
        return <Overview onSelectCompany={setSelectedCompany} />;
      case 'companies':
        return <CompanyList onSelectCompany={setSelectedCompany} />;
      case 'assessments':
        return <Assessments />;
      default:
        return <Overview onSelectCompany={setSelectedCompany} />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50/50 dark:bg-neutral-950">
      <Toaster position="top-center" />
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white dark:bg-neutral-900 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Building2 className="h-6 w-6" />
            <span>SimHouse PBL</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Software Engineering Lab</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Overview" 
            active={activeTab === 'overview' && !selectedCompany} 
            onClick={() => { setActiveTab('overview'); setSelectedCompany(null); }} 
          />
          <SidebarItem 
            icon={<Users className="h-5 w-5" />} 
            label="Companies" 
            active={activeTab === 'companies' || !!selectedCompany} 
            onClick={() => { setActiveTab('companies'); setSelectedCompany(null); }} 
          />
          <SidebarItem 
            icon={<ClipboardCheck className="h-5 w-5" />} 
            label="Assessments" 
            active={activeTab === 'assessments' && !selectedCompany} 
            onClick={() => { setActiveTab('assessments'); setSelectedCompany(null); }} 
          />
        </nav>

        <div className="p-4 border-t">
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Settings" 
            active={false} 
            onClick={() => {}} 
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-white dark:bg-neutral-900 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search companies, students..." className="w-full pl-9 bg-neutral-50 dark:bg-neutral-800 border-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=teacher" />
                <AvatarFallback>PO</AvatarFallback>
              </Avatar>
              <div className="text-sm font-medium">Prof. Stakeholder</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <ScrollArea className="flex-1 p-8">
          {renderContent()}
        </ScrollArea>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Overview({ onSelectCompany }: { onSelectCompany: (company: Company) => void }) {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Monitor the progress of all simulated software houses.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCompanies.length}</div>
            <p className="text-xs text-muted-foreground">Active in current semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCompanies.reduce((acc, company) => acc + company.members.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sprint</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Sprint 2</div>
            <p className="text-xs text-muted-foreground">Ends in 4 days</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Company Progress</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCompanies.map(company => (
            <Card key={company.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => onSelectCompany(company)}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{company.name}</CardTitle>
                <CardDescription className="line-clamp-1">{company.project}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium">{company.progress}%</span>
                    </div>
                    <Progress value={company.progress} className={`h-2 ${getProgressColor(company.progress)}`} />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex -space-x-2">
                      {company.members.slice(0, 4).map(member => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={member.avatarUrl} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {company.members.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                          +{company.members.length - 4}
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary">{company.members.length} members</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompanyList({ onSelectCompany }: { onSelectCompany: (company: Company) => void }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Simulated Companies</h1>
        <p className="text-muted-foreground mt-2">Manage and view details of all student teams.</p>
      </div>
      
      <div className="grid gap-6">
        {mockCompanies.map(company => (
          <Card key={company.id} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{company.name}</h2>
                  <p className="text-muted-foreground italic">"{company.slogan}"</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Project</h3>
                  <p className="font-medium">{company.project}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Culture</h3>
                  <p className="text-sm">{company.culture}</p>
                </div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 md:w-72 border-t md:border-t-0 md:border-l flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Sprint Progress</span>
                    <span>{company.progress}%</span>
                  </div>
                  <Progress value={company.progress} className={`h-2 ${getProgressColor(company.progress)}`} />
                </div>
                <Button className="w-full" onClick={() => onSelectCompany(company)}>View Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CompanyDetail({ company, onBack }: { company: Company, onBack: () => void }) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Button variant="ghost" onClick={onBack} className="-ml-4 mb-2 text-muted-foreground">
        &larr; Back to Dashboard
      </Button>
      
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{company.name}</h1>
          <p className="text-xl text-muted-foreground mt-1">{company.project}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={() => {
            toast.error('🚨 CRISIS ALERT: Client Changed Their Mind!', {
              description: 'Change Request (CR): The client wants to completely redesign the user flow. Teams must adapt immediately!',
              duration: 6000,
            });
          }}>Inject Change Request (CR)</Button>
          <Button>Schedule Sprint Review</Button>
        </div>
      </div>

      <Tabs defaultValue="team" className="w-full mt-8">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="team">Team & Roles</TabsTrigger>
          <TabsTrigger value="sprints">Sprints (Agile)</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="team" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Structure</CardTitle>
              <CardDescription>Roles and responsibilities within {company.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {company.members.map(member => (
                  <div key={member.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatarUrl} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <Badge variant="secondary" className="mt-1">{member.role}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sprints" className="mt-6">
          <ProjectManagementBoard company={company} />
        </TabsContent>

        <TabsContent value="docs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Engineering Artifacts</CardTitle>
              <CardDescription>SRS, SDD, UI/UX Prototypes, and Test Cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <DocCard title="Software Requirement Specification (SRS)" role="System Analyst" status="Approved" />
                <DocCard title="Database Schema & Sequence Diagrams" role="System Analyst" status="In Review" />
                <DocCard title="High-Fidelity Prototypes (Figma)" role="UI/UX Designer" status="Approved" />
                <DocCard title="Test Cases & QA Reports" role="QA / Tester" status="Draft" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Matrix</CardTitle>
              <CardDescription>Evaluation based on Engineering Process and Soft Skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AssessmentRow title="Technical Skills (40%)" desc="Code Quality, DB Design, Git Usage, Testing" score={85} />
              <AssessmentRow title="Process & Documentation (20%)" desc="SRS, SDD, Task Board Updates" score={70} />
              <AssessmentRow title="Soft Skills & Collaboration (20%)" desc="Teamwork, Conflict Resolution, Presentation" score={90} />
              <AssessmentRow title="Peer Review (20%)" desc="Intra-team evaluation on role responsibility" score={88} />
              
              <Separator />
              
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-bold">Total Grade</span>
                <span className="text-2xl font-bold text-primary">83.6 / 100</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DocCard({ title, role, status }: { title: string, role: string, status: string }) {
  return (
    <div className="p-4 border rounded-lg flex flex-col space-y-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer">
      <div className="flex justify-between items-start">
        <h4 className="font-semibold text-sm">{title}</h4>
        <Badge variant={status === 'Approved' ? 'default' : status === 'In Review' ? 'secondary' : 'outline'}>
          {status}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">Maintained by: {role}</p>
    </div>
  );
}

function AssessmentRow({ title, desc, score }: { title: string, desc: string, score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
        <div className="text-right">
          <span className="font-bold">{score}</span>
          <span className="text-muted-foreground text-sm"> / 100</span>
        </div>
      </div>
      <Progress value={score} className={`h-2 ${getProgressColor(score)}`} />
    </div>
  );
}

function Assessments() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(mockCompanies[0].id);
  const [selectedSprintId, setSelectedSprintId] = useState<string>(mockSprints[1].id);
  
  const selectedCompany = mockCompanies.find(c => c.id === selectedCompanyId);
  
  const [grades, setGrades] = useState<Record<string, any>>({});

  const handleGradeChange = (studentId: string, field: string, value: string) => {
    const numValue = parseInt(value);
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: isNaN(numValue) ? '' : numValue > 100 ? 100 : numValue < 0 ? 0 : numValue
      }
    }));
  };

  const calculateTotal = (studentId: string) => {
    const studentGrades = grades[studentId] || {};
    const tech = studentGrades.technical || 0;
    const proc = studentGrades.process || 0;
    const soft = studentGrades.soft || 0;
    const peer = studentGrades.peer || 0;
    
    return ((tech * 0.4) + (proc * 0.2) + (soft * 0.2) + (peer * 0.2)).toFixed(1);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Individual Assessment</h1>
          <p className="text-muted-foreground mt-2">Grade students individually based on their role and sprint performance.</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              {mockCompanies.map(c => (
                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedSprintId} onValueChange={setSelectedSprintId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent>
              {mockSprints.map(s => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Grading Sheet - {selectedCompany?.name}</CardTitle>
          <CardDescription>Enter scores (0-100) for each category. Total is automatically calculated based on weight.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-[120px]">Technical (40%)</TableHead>
                  <TableHead className="w-[120px]">Process (20%)</TableHead>
                  <TableHead className="w-[120px]">Soft Skills (20%)</TableHead>
                  <TableHead className="w-[120px]">Peer (20%)</TableHead>
                  <TableHead className="text-right">Total Score</TableHead>
                  <TableHead className="text-right w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCompany?.members.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatarUrl} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium whitespace-nowrap">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="whitespace-nowrap">{student.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        min="0" max="100" 
                        className="h-8 w-20"
                        value={grades[student.id]?.technical ?? ''}
                        onChange={(e) => handleGradeChange(student.id, 'technical', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        min="0" max="100" 
                        className="h-8 w-20"
                        value={grades[student.id]?.process ?? ''}
                        onChange={(e) => handleGradeChange(student.id, 'process', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        min="0" max="100" 
                        className="h-8 w-20"
                        value={grades[student.id]?.soft ?? ''}
                        onChange={(e) => handleGradeChange(student.id, 'soft', e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input 
                        type="number" 
                        min="0" max="100" 
                        className="h-8 w-20"
                        value={grades[student.id]?.peer ?? ''}
                        onChange={(e) => handleGradeChange(student.id, 'peer', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary text-lg">
                      {calculateTotal(student.id)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger render={<Button variant="outline" size="sm" />}>
                          Report
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <StudentReportCard 
                            student={student} 
                            grades={grades[student.id] || {}} 
                            onGradeChange={(field, val) => handleGradeChange(student.id, field, val)} 
                            totalScore={calculateTotal(student.id)}
                          />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Grades
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Project Management Components ---

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case 'Done': return 'bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
    case 'Working on it': return 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
    case 'Stuck': return 'bg-red-100 text-red-800 border border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
    case 'To Do': return 'bg-neutral-100 text-neutral-800 border border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700';
    default: return 'bg-neutral-100 text-neutral-800 border border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700';
  }
};

const getStatusDotColor = (status: TaskStatus) => {
  switch (status) {
    case 'Done': return 'bg-emerald-500';
    case 'Working on it': return 'bg-amber-500';
    case 'Stuck': return 'bg-red-500';
    case 'To Do': return 'bg-neutral-400';
    default: return 'bg-neutral-400';
  }
};

const getProgressColor = (progress: number, status?: TaskStatus) => {
  if (status === 'Done' || progress === 100) return '[&>div]:bg-emerald-500';
  if (status === 'Stuck') return '[&>div]:bg-red-500';
  if (status === 'Working on it') return '[&>div]:bg-amber-500';
  if (progress >= 80) return '[&>div]:bg-emerald-400';
  if (progress >= 50) return '[&>div]:bg-amber-400';
  if (progress > 0) return '[&>div]:bg-blue-400';
  return '[&>div]:bg-neutral-300';
};

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'Critical': return 'bg-red-600 text-white';
    case 'High': return 'bg-purple-500 text-white';
    case 'Medium': return 'bg-blue-400 text-white';
    case 'Low': return 'bg-neutral-400 text-white';
    default: return 'bg-neutral-200 text-neutral-800';
  }
};

function ProjectManagementBoard({ company }: { company: Company }) {
  const [view, setView] = useState<'table' | 'kanban'>('table');
  const [showAI, setShowAI] = useState(false);

  const getAssignees = (assigneeIds: string[]) => {
    return assigneeIds.map(id => company.members.find(m => m.id === id)).filter(Boolean) as Student[];
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Project Tasks</CardTitle>
            <CardDescription>Manage and track sprint progress</CardDescription>
          </div>
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-md">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAI(true)}
              className="gap-2 border-primary/50 text-primary hover:bg-primary/10"
            >
              <Sparkles className="h-4 w-4" />
              AI Sidekick
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button 
              variant={view === 'table' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setView('table')}
              className="gap-2"
            >
              <ListTodo className="h-4 w-4" />
              Main Table
            </Button>
            <Button 
              variant={view === 'kanban' ? 'secondary' : 'ghost'} 
              size="sm" 
              onClick={() => setView('kanban')}
              className="gap-2"
            >
              <KanbanSquare className="h-4 w-4" />
              Kanban
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {view === 'table' ? (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-neutral-50 dark:bg-neutral-900">
                <TableRow>
                  <TableHead className="w-[400px]">Task</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-center w-[150px]">Status</TableHead>
                  <TableHead className="text-center w-[150px]">Priority</TableHead>
                  <TableHead className="w-[200px]">Timeline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {company.tasks.map(task => (
                  <TableRow key={task.id} className="group">
                    <TableCell className="font-medium border-l-4 border-l-transparent group-hover:border-l-primary">
                      {task.title}
                      {task.evidenceLinks && task.evidenceLinks.length > 0 && (
                        <div className="flex gap-2 mt-2">
                          {task.evidenceLinks.map((link, idx) => (
                            <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="text-[10px] flex items-center gap-1 text-blue-600 hover:underline bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded">
                              {link.type === 'github' && <Github className="h-3 w-3" />}
                              {link.type === 'figma' && <Figma className="h-3 w-3" />}
                              {link.type === 'doc' && <FileText className="h-3 w-3" />}
                              {link.type === 'other' && <LinkIcon className="h-3 w-3" />}
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {getAssignees(task.assignees).map(member => (
                          <Avatar key={member.id} className="h-7 w-7 border-2 border-background" title={member.name}>
                            <AvatarImage src={member.avatarUrl} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center text-xs font-medium rounded-sm ${getStatusColor(task.status)}`}>
                        {task.status}
                      </div>
                    </TableCell>
                    <TableCell className="p-1">
                      <div className={`w-full h-8 flex items-center justify-center text-xs font-medium rounded-sm ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>{task.startDate}</span>
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={task.progress} className={`h-2 w-full ${getProgressColor(task.progress, task.status)}`} />
                          <span className="text-xs font-medium w-8 text-right">{task.progress}%</span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} className="p-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {['To Do', 'Working on it', 'Stuck', 'Done'].map(status => (
              <div key={status} className="flex-1 min-w-[280px] bg-neutral-100 dark:bg-neutral-900/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusDotColor(status as TaskStatus)}`} />
                    <h3 className="font-semibold text-sm">{status}</h3>
                    <span className="text-xs text-muted-foreground">
                      {company.tasks.filter(t => t.status === status).length}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {company.tasks.filter(t => t.status === status).map(task => (
                    <Card key={task.id} className="p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="space-y-3">
                        <p className="text-sm font-medium leading-tight">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {getAssignees(task.assignees).map(member => (
                              <Avatar key={member.id} className="h-6 w-6 border-2 border-background" title={member.name}>
                                <AvatarImage src={member.avatarUrl} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <div className={`px-2 py-0.5 rounded text-[10px] font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-[10px] mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className={`h-1.5 w-full ${getProgressColor(task.progress, task.status)}`} />
                        </div>
                        {task.evidenceLinks && task.evidenceLinks.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-2 border-t">
                            {task.evidenceLinks.map((link, idx) => (
                              <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="text-[10px] flex items-center gap-1 text-blue-600 hover:underline bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded">
                                {link.type === 'github' && <Github className="h-3 w-3" />}
                                {link.type === 'figma' && <Figma className="h-3 w-3" />}
                                {link.type === 'doc' && <FileText className="h-3 w-3" />}
                                {link.type === 'other' && <LinkIcon className="h-3 w-3" />}
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground h-8">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={showAI} onOpenChange={setShowAI}>
        <DialogContent className="max-w-2xl">
          <AIAssistantPanel company={company} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// --- Student Report Card Component ---

function StudentReportCard({ student, grades, onGradeChange, totalScore }: { student: Student, grades: any, onGradeChange: (field: string, val: string) => void, totalScore: string }) {
  const radarData = [
    { subject: 'Technical', A: student.skills.technical, fullMark: 100 },
    { subject: 'Process/Agile', A: student.skills.process, fullMark: 100 },
    { subject: 'Communication', A: student.skills.communication, fullMark: 100 },
    { subject: 'Problem Solving', A: student.skills.problemSolving, fullMark: 100 },
    { subject: 'Teamwork', A: student.skills.teamwork, fullMark: 100 },
    { subject: 'Responsibility', A: student.skills.responsibility, fullMark: 100 },
  ];

  const tech = grades?.technical || 0;
  const proc = grades?.process || 0;
  const soft = grades?.soft || 0;
  const peer = grades?.peer || 0;
  
  const getGradeLetter = (scoreStr: string) => {
    const score = parseFloat(scoreStr);
    if(score >= 80) return 'A';
    if(score >= 75) return 'B+';
    if(score >= 70) return 'B';
    if(score >= 65) return 'C+';
    if(score >= 60) return 'C';
    if(score >= 55) return 'D+';
    if(score >= 50) return 'D';
    return 'F';
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl">Automated Report Card</DialogTitle>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col items-center p-4 border rounded-lg bg-neutral-50 dark:bg-neutral-900">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={student.avatarUrl} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-center">{student.name}</h2>
          <Badge className="mt-2">{student.role}</Badge>
          
          <div className="w-full h-[250px] mt-6">
            <h3 className="text-sm font-semibold text-center mb-2">Student Growth Radar</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Skills" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Assessment Details</h3>
            <Button variant="outline" size="sm" onClick={() => toast.success('Report Exported Successfully!')}>Export PDF</Button>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-neutral-50 dark:bg-neutral-900">
                <TableRow>
                  <TableHead>หัวข้อประเมิน</TableHead>
                  <TableHead>รายละเอียด (Evidence)</TableHead>
                  <TableHead className="w-[100px]">คะแนน (100)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Technical Skill (40%)</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.reportEvidence.technical}</TableCell>
                  <TableCell>
                    <Input type="number" value={tech || ''} onChange={(e) => onGradeChange('technical', e.target.value)} className="h-8" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Process & Doc (20%)</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.reportEvidence.process}</TableCell>
                  <TableCell>
                    <Input type="number" value={proc || ''} onChange={(e) => onGradeChange('process', e.target.value)} className="h-8" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Soft Skills (20%)</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.reportEvidence.soft}</TableCell>
                  <TableCell>
                    <Input type="number" value={soft || ''} onChange={(e) => onGradeChange('soft', e.target.value)} className="h-8" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Peer Review (20%)</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.reportEvidence.peer}</TableCell>
                  <TableCell>
                    <Input type="number" value={peer || ''} onChange={(e) => onGradeChange('peer', e.target.value)} className="h-8" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end items-center gap-4 p-4 bg-primary/10 rounded-lg mt-4">
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">รวม (Grade)</p>
              <p className="text-3xl font-bold text-primary">{getGradeLetter(totalScore)} <span className="text-lg font-normal text-foreground">({totalScore}/100)</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- AI Assistant Panel Component ---

function AIAssistantPanel({ company }: { company: Company }) {
  // Mock AI Logic
  const requiredRoles = ['Project Manager', 'System Analyst', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'QA / Tester'];
  const currentRoles = company.members.map(m => m.role);
  const missingRoles = requiredRoles.filter(r => !currentRoles.includes(r as any));

  const overloadedMembers = company.members.filter(m => {
    const activeTasks = company.tasks.filter(t => t.assignees.includes(m.id) && t.status !== 'Done');
    return activeTasks.length >= 2;
  });

  const delayedTasks = company.tasks.filter(t => t.progress < 50 && t.status === 'Stuck');
  const aheadTasks = company.tasks.filter(t => t.progress > 80 && t.status === 'Working on it');

  const overallProgress = Math.round(company.tasks.reduce((acc, t) => acc + t.progress, 0) / (company.tasks.length || 1));

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Project Sidekick
        </DialogTitle>
        <CardDescription>
          Analyzing project health, team workload, and timeline for {company.name}.
        </CardDescription>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Project Progress</p>
              <p className="text-2xl font-bold">{overallProgress}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-neutral-50 dark:bg-neutral-900">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-full">
              <ListTodo className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Tasks</p>
              <p className="text-2xl font-bold">{company.tasks.filter(t => t.status !== 'Done').length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">AI Action Suggestions</h3>
        
        {missingRoles.length > 0 && (
          <div className="flex gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
            <Info className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-orange-800 dark:text-orange-300 text-sm">Missing Key Roles</p>
              <p className="text-xs text-orange-700 dark:text-orange-400 mt-1">
                Your team is missing: <span className="font-semibold">{missingRoles.join(', ')}</span>. Consider reassigning roles or combining responsibilities to ensure all project areas are covered.
              </p>
            </div>
          </div>
        )}

        {overloadedMembers.length > 0 && (
          <div className="flex gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800 dark:text-red-300 text-sm">Flag Overloaded Team Members</p>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                {overloadedMembers.map(m => m.name).join(', ')} {overloadedMembers.length > 1 ? 'have' : 'has'} multiple active tasks. Consider redistributing work to prevent burnout and delays.
              </p>
            </div>
          </div>
        )}

        {delayedTasks.length > 0 && (
          <div className="flex gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800 dark:text-red-300 text-sm">Adjust Project Timelines</p>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                {delayedTasks.length} task(s) are stuck and behind schedule (e.g., "{delayedTasks[0].title}"). Recommend scheduling a quick sync to unblock the team.
              </p>
            </div>
          </div>
        )}

        {aheadTasks.length > 0 && (
          <div className="flex gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-300 text-sm">Ahead of Schedule</p>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                {aheadTasks.length} task(s) are progressing faster than expected. Great job!
              </p>
            </div>
          </div>
        )}

        {missingRoles.length === 0 && overloadedMembers.length === 0 && delayedTasks.length === 0 && (
          <div className="flex gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
            <Sparkles className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-300 text-sm">Project is Healthy</p>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                Workload is balanced, and tasks are on track. Keep up the good work!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
