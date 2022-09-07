import React, { useState, useContext, useEffect } from 'react';
import '../settings/Settings.scss';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from "axios";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import auth_service from '../../services/auth.service';
import { setInitialPasswordState } from '../../slices/authSlice';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress'

const Settings = () => {
    const { t } = useTranslation();
    document.title=t('settings')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [editPassword, setEditPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [currentPasswordField, showCurrentPassword] = useState(false);
    const [newPasswordField, showNewPassword] = useState(false);
    const [confirmNewPasswordField, showConfirmPassword] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const { toggleTheme, theme } = useContext(ThemeContext);
    const token = useSelector((state) => state.auth.token !== null ? state.auth.token : localStorage.getItem('token') !== null ? localStorage.getItem('token') : null);
    const changePasswordState = useSelector((state) => state.auth.change_password);
    const emptyFields = () => { setCurrentPassword(''); setNewPassword(''); setConfirmNewPassword(''); }
    let requestState = useSelector((state) => state.auth.request)
    useEffect(() => {
        if (token === null || !token) {
            navigate('/authentication')
        }

        axios.post(process.env.REACT_APP_API_URL+"api/getUser", { token }, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
            });
        if (changePasswordState.status === 'success') emptyFields()
    }, [navigate, token, changePasswordState.status])
    
    const handleShowPassword = (field) => {
        if (field === "currentPassword") showCurrentPassword(!currentPasswordField)
        if (field === "newPassword") showNewPassword(!newPasswordField)
        if (field === "confirmNewPassword") showConfirmPassword(!confirmNewPasswordField)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <main>
            <section className={`settings ${theme}`}>
                {
                    user !== null ?
                        <div className="settings__wrapper">

                            <div className="settings__edit">
                                <h1 className="settings__title">{t('settings')}</h1>

                                <label className='settings__edit__label' htmlFor="emailAccount">{t('email')}</label>
                                <TextField
                                    id="emailAccount"
                                    variant="outlined"
                                    type="email"
                                    className='settings__input'
                                    size='small'
                                    value={user.email}
                                    disabled={true}
                                    title={user.email}
                                />

                                {editPassword === false ? <Button onClick={() => { setEditPassword(!editPassword) }} style={{ textTransform: "none" }} >{t('edit_password')}</Button> : null}

                                {
                                    editPassword ?
                                        <form onSubmit={(e) => { e.preventDefault(); auth_service.changePassword(token, currentPassword, newPassword, confirmNewPassword, user.userId) }} className="settings__edit">

                                            <h3 className="settings__edit__title">
                                                {t('edit_password')}
                                            </h3>

                                            <label className='settings__edit__label' htmlFor="currentPasswordEdit">{t('current_password')}</label>
                                            <OutlinedInput
                                                id="currentPasswordEdit"
                                                variant="outlined"
                                                type={currentPasswordField ? 'text' : 'password'}
                                                size="small"
                                                className='settings__input'
                                                value={currentPassword}
                                                onChange={(e) => { setCurrentPassword(e.target.value) }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { handleShowPassword("currentPassword") }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            title={t('show_password')}
                                                        >
                                                            {currentPasswordField ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />

                                            <label className='settings__edit__label' htmlFor="createPasswordEdit">{t('create_password')}</label>
                                            <OutlinedInput
                                                id="createPasswordEdit"
                                                variant="outlined"
                                                type={newPasswordField ? 'text' : 'password'}
                                                size="small"
                                                className='settings__input'
                                                value={newPassword}
                                                onChange={(e) => { setNewPassword(e.target.value) }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { handleShowPassword("newPassword") }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            title={t('show_password')}
                                                        >
                                                            {newPasswordField ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />

                                            <label className='settings__edit__label' htmlFor="confirmPasswordEdit">{t('confirm_password')}</label>
                                            <OutlinedInput
                                                id="confirmPasswordEdit"
                                                variant="outlined"
                                                type={confirmNewPasswordField ? 'text' : 'password'}
                                                size="small"
                                                className='settings__input'
                                                value={confirmNewPassword}
                                                onChange={(e) => { setConfirmNewPassword(e.target.value) }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => { handleShowPassword("confirmNewPassword") }}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            title={t('show_password')}
                                                        >
                                                            {confirmNewPasswordField ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <div className="settings__edit__buttons">
                                                <Button type="submit" style={{ textTransform: "none", width: "50%" }}>{t('edit')}</Button>
                                                <Button onClick={() => { setEditPassword(!editPassword); dispatch(setInitialPasswordState()); emptyFields() }} style={{ textTransform: "none", width: "50%" }}>{t('cancel')}</Button>
                                            </div>
                                            {requestState==="loading" ? <div style={{margin:"auto"}}> <CircularProgress color={theme==="dark" ? "inherit": theme==="light" ? "primary" : null} /> </div>: requestState==="none" ? null : null}
                                            {
                                                changePasswordState.status === 'fail' || changePasswordState.status === 'success' ?
                                                    <Chip
                                                        style={{ height: "auto", padding: ".5rem" }}
                                                        label={<Box sx={{ whiteSpace: "break-spaces", textAlign: "center" }}>{t(changePasswordState.code_msg)} </Box>}
                                                        color={changePasswordState.status === "success" ? "success" : changePasswordState.status === 'fail' ? "error" : null} />
                                                    : changePasswordState.status === 'initial' ? null : null
                                            }
                                        </form>
                                        : null
                                }
                            </div>

                        </div>
                        : null
                }

            </section>
        </main>



    )
}

export default Settings