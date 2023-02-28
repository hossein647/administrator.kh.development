import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { ApplicationComponent } from './component/application/application.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { HomeComponent } from './component/home/home.component';
import { MainPageSiteComponent } from './component/main-page-site/main-page-site.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ProfileComponent } from './component/profile/profile.component';
import { QuestionComponent } from './component/question/question.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadComponent } from './component/upload/upload.component';
import { ReciterComponent } from './component/reciter/reciter.component';
import { DropdownModule } from 'primeng/dropdown';
import { ByteConverterPipe } from './component/upload/byte-converter.pipe';
import { ShareModule } from '../shared/modules/share.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { AudioComponent } from './component/audio/audio.component';
import { SafeHTMLPipe } from './component/application/safe-html.pipe';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginatorModule } from 'primeng/paginator';
import { DiscountComponent } from './component/discount/discount.component';
import { ShamsiDatePipe } from './component/discount/shamsi-date.pipe';
import { SubscriptionComponent } from './component/subscription/subscription.component';
import { PrivacyComponent } from './component/privacy/privacy.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SidebarComponent,
        HomeComponent,
        NavbarComponent,
        ApplicationComponent,
        QuestionComponent,
        ContactUsComponent,
        AboutUsComponent,
        MainPageSiteComponent,
        ProfileComponent,
        DashboardComponent,
        UploadComponent,
        ReciterComponent,
        ByteConverterPipe,
        AudioComponent,
        SafeHTMLPipe,
        DiscountComponent,
        ShamsiDatePipe,
        SubscriptionComponent,
        PrivacyComponent,
    ],
    providers: [MessageService, ByteConverterPipe],
    imports: [
        ShareModule,
        CommonModule,
        DashboardRoutingModule,
        CardModule,
        ChartModule,
        TableModule,
        InputTextareaModule,
        HttpClientModule,
        AvatarModule,
        SplitButtonModule,
        FileUploadModule,
        DropdownModule,
        ProgressBarModule,
        TabViewModule,
        DialogModule,
        ProgressSpinnerModule,
        InputSwitchModule,
        PaginatorModule,
        ReactiveFormsModule,
    ]
})
export class DashboardModule { }
