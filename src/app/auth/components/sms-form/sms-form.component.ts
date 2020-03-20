import { Component, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmsVerification } from '@pko/auth/models';

@Component({
  selector: 'pko-sms-form',
  templateUrl: './sms-form.component.pug',
  styleUrls: ['./sms-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SMSFormComponent implements OnInit {
  @Output() submitted: EventEmitter<SmsVerification> = new EventEmitter<SmsVerification>();
  @Output() resend: EventEmitter<void> = new EventEmitter<void>();

  readonly phoneNumber: string;
  readonly pesel: string;

  form: FormGroup;

  constructor(private _fb: FormBuilder, private _route: ActivatedRoute, private _router: Router) {
    this.phoneNumber = _route.snapshot.queryParams.phoneNumber;
    this.pesel = _route.snapshot.queryParams.pesel;
  }

  ngOnInit(): void {
    if (!this.phoneNumber || !this.pesel) this._router.navigate(['/registration']);

    this.form = this._fb.group({
      phoneNumber: [this.phoneNumber],
      pesel: [this.pesel],
      code: ['', Validators.compose([Validators.required])],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted.emit(this.form.value);
  }
}
