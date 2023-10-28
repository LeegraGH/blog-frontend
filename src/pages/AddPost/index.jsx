import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';

import axios from '../../utils/axios';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const isAuth = useSelector(state => Boolean(state.auth.data));
  const inputFileRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  React.useEffect(()=>{
    if (id) {
      axios.get(`/posts/${id}`)
      .then(({data}) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(', '));
        setImageUrl(data.imageUrl);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(null);
  };

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        text,
        imageUrl,
        tags
      }
      let postId = "";
      if (id) {
        postId = id;
        axios.patch(`/posts/${id}`, fields);
      } else {
        const { data } = await axios.post("/posts", fields);
        postId = data._id;
      }

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.log(error);
    }
  }

  if (!isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={imageUrl!==""?`http://localhost:4000${imageUrl}`:""} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing?"Сохранить":"Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
