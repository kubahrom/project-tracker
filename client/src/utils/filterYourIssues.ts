import { IFilterBy, IHomeIssue } from '../components/Home/YourIssues'

type FilterYourIssuesType = (issues: IHomeIssue[], filterBy: IFilterBy) => IHomeIssue[];
type SortYourIssuesType = (issues: IHomeIssue[], sortBy: string) => IHomeIssue[];

export const filterYourIssues: FilterYourIssuesType = (issues, filterBy) => {
    switch (filterBy.type) {
        case 'Type':
            return [...issues].filter((issue: IHomeIssue) => issue.type === filterBy.value);
        case 'Status':
            return [...issues].filter((issue: IHomeIssue) => issue.status === filterBy.value);
        case 'Priority':
            return [...issues].filter((issue: IHomeIssue) => issue.priority === filterBy.value);
        case 'Role':
            // return [...issues].filter((issue: IHomeIssue) => {
            //FIXME: not working fn
            // });
            return issues;
        default:
            return issues;
    }
    // if(filterBy.type !== 'Role') {
    //     return [...issues].filter((issue: IHomeIssue) => issue[filterBy.type] === filterBy.value);
    // }
}

export const sortYourIssues: SortYourIssuesType = (issues, sortBy) => {
    return [...issues].sort((a:IHomeIssue, b:IHomeIssue) => {
        if(sortBy === 'latest') {
            if(a.updatedAt > b.updatedAt) return -1;
            return 1;
        } else {
            if(a.updatedAt > b.updatedAt) return 1;
            return -1;
        }
})
}