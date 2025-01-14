import { object, string } from 'yup';

export const validateForm = async (data) => {
  try {
    const formShema = object().shape({
      clientName: string().required('Введите имя'),
      phone: string()
        .required('Введите номер')
        .length(10, 'Некорректный номер'),
      email: string()
        .required('Введите почту')
        .email('Некорректная почта'),
    });

    const result = await formShema.validate(data, { abortEarly: false });
    return result;
  } catch (e) {
    const errors = {}
    for (const { path, message } of e.inner) {
        errors[path] = message
    }
    throw new Error(JSON.stringify(errors))
  }
};
