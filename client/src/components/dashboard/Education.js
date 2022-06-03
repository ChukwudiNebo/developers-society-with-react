import React, { Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';



const Education = ({ education, deleteEducation }) =>
{

    const educations = education.map(edu => (
        <tr key = {edu._id}> 
            <td>{edu.school}</td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>
            <Moment format='YYYY/MM/DD'>
                {edu.from}
            </Moment> -{' '} {edu.to === null ? ('Now') : (
            <Moment format='YYYY/MM/DD'>
                {edu.from}
            </Moment>
                )}
            </td>
            <td>
                <button onClick={ () => deleteEducation(edu._id)} className='btn btn-danger'></button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2"> Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                    </tr>
                </thead>
                <tbody>{ educations }</tbody>
            </table>

        </Fragment>
    );
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};
 
export default connect(null, {deleteEducation})(Education);



// let salaries = {
//     John: 100,
//     Ann: 160,
//     Pete: 130
// }

// let sum = salaries.John + salaries.Ann + salaries.Pete;

// console.log(sum)

// let menu = {
//     width: 200,
//     height: 300,
//     title: "My menu"
// }

// for (let menus in menu)
// {
    
//     // menus.height * 2
    
//     let multiplyNumeric = menu.width * 2 
//     console.log(multiplyNumeric(menus))
// }

// multiplyNumeric(menu);
// for (let menus in menu)
// {
//     console.log(menu[menus.width*2])
// }