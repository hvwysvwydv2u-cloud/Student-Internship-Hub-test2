export default {
  name: 'student',
  title: 'Students',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'الاسم الكامل',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'phone',
      title: 'رقم الهاتف',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'governorate',
      title: 'المحافظة',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'academicYear',
      title: 'السنة الدراسية',
      type: 'string',
      options: {
        list: [
          { title: 'الأولى', value: 'الأولى' },
          { title: 'الثانية', value: 'الثانية' },
          { title: 'الثالثة', value: 'الثالثة' },
          { title: 'الرابعة', value: 'الرابعة' },
        ],
      },
    },
    {
      name: 'department',
      title: 'القسم الدراسي',
      type: 'string',
      options: {
        list: [
          { title: 'تكنولوجيا المعلومات', value: 'تكنولوجيا المعلومات' },
          { title: 'تكنولوجيا الشبكات', value: 'تكنولوجيا الشبكات' },
          { title: 'تكنولوجيا الأجهزة', value: 'تكنولوجيا الأجهزة' },
          { title: 'تصنيع غذائي', value: 'تصنيع غذائي' },
        ],
      },
    },
    {
      name: 'completedHours',
      title: 'الساعات التدريبية المنجزة',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'createdAt',
      title: 'تاريخ التسجيل',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'phone',
    },
  },
}
