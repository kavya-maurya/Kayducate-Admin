import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Student {
  _id?: string;
  name: string;
  email: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  subject: string;
  priority: string;
  status: string;
  dueDate: string;
  student: Student;
}

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  searchText = '';
  statusFilter = '';
  priorityFilter = '';

  // Change this to your backend URL if different
  apiUrl = 'https://kayducate-api.kaylynk.tech/api/tasks/admin/tasks';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {

    this.http.get<any>(this.apiUrl).subscribe({

      next: (response) => {

        this.tasks = response.tasks || [];

        this.filteredTasks = [...this.tasks];

      },

      error: (error) => {

        console.error('Error loading tasks:', error);

      }

    });

  }

  filterTasks(): void {

    const search = this.searchText.trim().toLowerCase();

    this.filteredTasks = this.tasks.filter(task => {

      const matchesSearch =

        task.title.toLowerCase().includes(search) ||

        task.subject.toLowerCase().includes(search) ||

        task.description.toLowerCase().includes(search) ||

        task.student?.name.toLowerCase().includes(search) ||

        task.student?.email.toLowerCase().includes(search);

      const matchesStatus =

        !this.statusFilter ||

        task.status === this.statusFilter;

      const matchesPriority =

        !this.priorityFilter ||

        task.priority === this.priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;

    });

  }

}