import moment from 'moment/moment';
export const getCurrentTimeStamp = (timeStamp) =>
{
    return moment().format(timeStamp);
}
    