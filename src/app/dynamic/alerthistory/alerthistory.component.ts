import { Component, OnInit } from '@angular/core';
import { EmailHistoryService } from '../prediction/email-history.service';

@Component({
  selector: 'app-alert-history',
  templateUrl: './alerthistory.component.html',
  styleUrls: ['./alerthistory.component.css']
})
export class alerthistoryComponent implements OnInit {
  emailHistory: any[] = [];

  constructor(private emailHistoryService: EmailHistoryService) { }

  ngOnInit(): void {
    this.loadEmailHistory();
  }

  loadEmailHistory() {
    this.emailHistoryService.getEmailHistory().subscribe(
      (history: any[]) => {
        this.emailHistory = history;
      },
      (error) => {
        console.error('Error fetching email history:', error);
      }
    );
  }
}
