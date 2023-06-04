import {Response} from 'express'

export const sessionUserSettings = (req: any, res: Response, next: (err?: any) => void) :void => {
    const userSettings = req.session?.userSettings || {orderBy: 'title', orderDirection: -1, showCompleted: true, styleToggle: false};
    const {orderBy, orderDirection, hideCompleted, styleToggle} = req.query;


    orderBy && (userSettings.orderBy = orderBy)
    orderDirection && (userSettings.orderDirection = orderDirection * -1);
    hideCompleted !== undefined && (userSettings.showCompleted = !userSettings.showCompleted);
    styleToggle !== undefined && (userSettings.styleToggle = !userSettings.styleToggle);


    req.userSettings = req.session.userSettings = userSettings;
    next();
};
