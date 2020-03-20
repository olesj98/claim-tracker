import { ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { PeselMaskConfig, PhoneNumberMaskConfig } from '@pko/shared/util';
import { PeselValidator } from '@pko/auth/validators/pesel/pesel.validator';
import { ErrorCode, ErrorInfo } from '@pko/core/error';
import { Signup } from '@pko/auth/models';

@Component({
  selector: 'pko-signup-form',
  templateUrl: './signup-form.component.pug',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent implements OnInit, OnDestroy, DoCheck {
  @Input() error: ErrorInfo;
  @Output() submitted: EventEmitter<Signup> = new EventEmitter<Signup>();
  form: FormGroup;

  readonly authErrorCode = ErrorCode.AUTH;
  readonly accountLockedCode = ErrorCode.ACCOUNT_LOCKED;

  phoneNumberMask = new PhoneNumberMaskConfig();
  peselMask = new PeselMaskConfig();

  private readonly destroyed$ = new Subject();

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      phoneNumber: [null, Validators.required],
      pesel: [null, Validators.compose([
        Validators.required,
        PeselValidator.validate
      ])]
    });

    this.clearExternalErrorOnPhoneNumberChange();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngDoCheck(): void {
    const isAccountError = [this.authErrorCode, this.accountLockedCode].map(c => c.toString()).includes(this.error?.code);

    if (isAccountError) {
      this.phoneNumber.setErrors({ [this.error?.code]: true });
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted.next(this.form.value);
  }

  get phoneNumber() {
    return this.form.get('phoneNumber');
  }

  get pesel() {
    return this.form.get('pesel');
  }

  private clearExternalErrorOnPhoneNumberChange() {
    this.phoneNumber.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        tap(() => this.error = null)
      )
      .subscribe();
  }
}
