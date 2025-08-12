// Xóa thông tin bệnh nhân page UI
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBenhNhan() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [benhNhan, setBenhNhan] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/benhnhan/${id}/`).then(res => setBenhNhan(res.data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenhNhan({ ...benhNhan, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.put(`/api/benhnhan/${id}/`, benhNhan).then(() => nav("/danh-sach-benh-nhan"));
  };

  if (!benhNhan) return <p>Đang tải...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="full_name" value={benhNhan.full_name} onChange={handleChange} required />
      <input name="phone" value={benhNhan.phone} onChange={handleChange} required />
      <input name="address" value={benhNhan.address || ""} onChange={handleChange} />
      <button type="submit">Lưu</button>
    </form>
  );
}

export default EditBenhNhan;