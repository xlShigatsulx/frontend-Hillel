import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";

export function Home() {
  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3 }}>
      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h3" gutterBottom>
          Тимофієнко Руслан
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Front-end Розробник | React
        </Typography>
        <Typography variant="body1">
          Досвідчений front-end розробник з пристрастю до створення динамічних
          веб-застосунків. Маю досвід роботи на фронтенді використовуючи React.
          Завжди прагну до вдосконалення своїх навичок та освоєння нових
          технологій.
        </Typography>
      </Paper>

      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Навички
        </Typography>
        <List>
          <ListItem>JavaScript (ES6+)</ListItem>
          <ListItem>React & Redux</ListItem>
          <ListItem>TypeScript</ListItem>
          <ListItem>HTML & CSS</ListItem>
          <ListItem>MongoDB</ListItem>
          <ListItem>RESTful API</ListItem>
          <ListItem>Git & GitHub</ListItem>
        </List>
      </Paper>

      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          Досвід роботи
        </Typography>
        <Typography variant="h6">
          Розробник програмного забезпечення в компанії Shigatsu
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Квітень 9999 - Теперішній час
        </Typography>
        <Typography variant="body1">
          Розробка та підтримка веб-застосунків з використанням React, Redux.
          Співпраця з командою дизайнерів для створення зручних інтерфейсів та
          оптимізації продуктивності.
        </Typography>
        <Divider sx={{ margin: "20px 0" }} />
      </Paper>

      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Освіта
        </Typography>
        <Typography variant="h6">Бакалавр з комп'ютерних наук</Typography>
        <Typography variant="body2" color="textSecondary">
          ХНУРЕ, 2021 - 2025
        </Typography>
        <Typography variant="body1">
          Спеціалізація на розробці програмного забезпечення, алгоритмах та
          структурах даних. Участь у кількох конкурсах з програмування.
        </Typography>
      </Paper>

      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          href="mailto:shigatsu@example.com"
        >
          Зв'язатися зі мною
        </Button>
      </Box>
    </Box>
  );
}
