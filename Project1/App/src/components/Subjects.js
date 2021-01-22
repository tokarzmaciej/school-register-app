import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Menu from './Menu';
import { getStudents } from '../operations/students';
import 'bulma/css/bulma.css';
import CreateSubject from './CreateSubject';
import CreateMark from './CreateMark';
import { deleteSubject, patchSubject } from '../operations/subjects';
import { deleteMark, patchMark } from '../operations/marks';


function Subjects({ allStudents, fetchStudents, delSubject, updateSubject, delMark, updateMark }) {

    useEffect(() => fetchStudents(), [fetchStudents])
    const [editSubject, setEditSubject] = useState("")
    const [editMark, setEditMark] = useState("")

    return (
        <div id="container-subjects">
            <Menu></Menu>
            <div className="subjects">
                <div className="components-subject">
                    <CreateSubject></CreateSubject>
                    <CreateMark></CreateMark>
                </div>
                <div className="view">
                    {allStudents && allStudents.map(student =>
                        <div key={student._id} className="box has-background-info-light is-size-4">
                            <div className="notification has-background-info-light">
                                <h1 to={`/student/${student._id}`} className="title has-text-link-dark">
                                    {student.name + " " + student.surname}
                                </h1>
                                <ul>
                                    {student.subjects.map((element, index) =>
                                        <li className="block" key={index}>
                                            <span className="tag has-background-info-light is-size-4 has-text-black has-text-weight-bold">
                                                <button className="delete has-background-danger mr-3" onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete subject?')) {
                                                        delSubject(element.idStudent, element["_id"])
                                                    }
                                                }}>
                                                </button>
                                                {element.name}
                                                <details className="details-subject-edit">
                                                    <summary></summary>
                                                    <div>
                                                        <input className="input is-size-7"
                                                            placeholder="new name"
                                                            value={editSubject}
                                                            onChange={(event) => setEditSubject(event.target.value)}>
                                                        </input>
                                                        <button className="button is-size-7"
                                                            onClick={() => {
                                                                if (window.confirm('Are you sure you want to edit subject?')) {
                                                                    updateSubject({ name: editSubject }, element.idStudent, element["_id"])
                                                                    setEditSubject("")
                                                                }
                                                            }}>OK
                                                            </button>
                                                    </div>
                                                </details>
                                            </span>
                                            <ul className="ml-6">
                                                {element.marks.map((mark, index) =>
                                                    <li className="block" key={index} >
                                                        <span className="tag has-background-info-light is-size-4 has-text-black">
                                                            <button className="delete has-background-danger-dark mr-3" onClick={() => {
                                                                if (window.confirm('Are you sure you want to delete mark?')) {
                                                                    delMark(element.idStudent, element["_id"], mark["_id"])
                                                                }
                                                            }}>
                                                            </button>
                                                            {mark.name}: {mark.grade}
                                                            <details className="details-subject-edit">
                                                                <summary></summary>
                                                                <div>
                                                                    <input className="input is-size-7"
                                                                        placeholder="new name"
                                                                        value={editMark}
                                                                        onChange={(event) => setEditMark(event.target.value)}>
                                                                    </input>
                                                                    <button className="button is-size-7"
                                                                        onClick={() => {
                                                                            if (window.confirm('Are you sure you want to edit mark?')) {
                                                                                updateMark({ name: editMark }, mark["_id"])
                                                                                setEditMark("")
                                                                            }
                                                                        }}>OK
                                                                        </button>
                                                                </div>
                                                            </details>
                                                        </span>
                                                    </li>)}
                                            </ul>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )
                    }
                </div>

            </div >
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        allStudents: state.students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudents: () => {
            dispatch(getStudents());
        },
        delSubject: (idStudent, idSubject) => {
            dispatch(deleteSubject(idStudent, idSubject));
        },
        updateSubject: (payload, idStudent, idSubject) => {
            dispatch(patchSubject(payload, idStudent, idSubject));
        },
        delMark: (idStudent, idSubject, idMark) => {
            dispatch(deleteMark(idStudent, idSubject, idMark));
        },
        updateMark: (payload, idMark) => {
            dispatch(patchMark(payload, idMark));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects);

