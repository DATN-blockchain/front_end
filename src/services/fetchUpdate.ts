import instanceAxios from '@/api/instanceAxios';

const fetchUpdate = async (
  url: string,
  data: object,
  onSucces?: (res?: any) => void,
  onFailed?: (res?: any) => void,
  onFinally?: () => void
) => {
  await instanceAxios
    .put(url, data)
    .then((res) => onSucces?.(res))
    .catch((err) => onFailed?.(err))
    .finally(() => onFinally?.());
};
export default fetchUpdate;
