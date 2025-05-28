import { Layout } from 'antd';

const { Footer } = Layout;

const FooterBar = () => (
  <Footer style={{ textAlign: 'center' }}>
    © {new Date().getFullYear()} My App. All Rights Reserved.
  </Footer>
);

export default FooterBar;
