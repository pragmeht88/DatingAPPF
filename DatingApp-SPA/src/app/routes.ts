import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailsResolver } from './_resolver/member-details.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { UnsavedGuard } from './_guards/unsaved.guards';
import { ListResolver } from './_resolver/list.resolver';
import { MessagesResolver } from './_resolver/messages.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'members',
                component: MemberListComponent,
                resolve: { users: MemberListResolver }
            },
            {
                path: 'members/:id',
                component: MemberDetailComponent,
                resolve: { user: MemberDetailsResolver }
            },
            {
                path: 'member/edit', component: MemberEditComponent,
                resolve: { user: MemberEditResolver },
                canDeactivate: [UnsavedGuard]
            },
            {
                path: 'messages',
                component: MessagesComponent,
                resolve: { messages: MessagesResolver }
            },
            {
                path: 'lists',
                component: ListComponent,
                resolve: { users: ListResolver }
            }
        ]
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
