import React from 'react'
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import { useHistory } from 'react-router-dom';
import { postData } from '../request';
import { item } from '../util';
import { motion } from 'framer-motion';

function TableRow({ id, sno, mailId, subject, body, date, type }) {

    const history = useHistory();

    const cancelMail = () => {
        window.alert('delete')
        postData(id, '/deletemail').then(() => console.log('deleted')).catch((e) => console.log(e))
    }

    const onMailClick = () => {
        history.push(`/singlemail/${id}`);
    }

    return (
        <motion.div variants={item} className="row body__row">
            <td onClick={onMailClick}>{sno}</td>
            <td onClick={onMailClick}>{mailId}</td>
            <td onClick={onMailClick}><p className="line-clamp-1">{subject} </p></td>
            <td onClick={onMailClick}>{date} </td>
            {
                type === 'sent' ?
                    <td><CloudDoneIcon style={{ color: 'green' }} /></td>
                    :
                    <td onClick={cancelMail}><CancelOutlinedIcon className="cancel" /></td>
            }
        </motion.div>
    )
}

export default TableRow
