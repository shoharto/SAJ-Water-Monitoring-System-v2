<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/" class="brand-link">
      <img
        src="dist/img/saj_logo_64.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: .8"
      />
      <span class="brand-text font-weight-light">SAJ Water Monitoring</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="dist/img/saj_avater.png" class="img-circle elevation-2" alt="User Image" />
        </div>
        <div class="info">
          <a href="#" class="d-block">Yusuf</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
          with font-awesome or any other icon font library-->
          <li class="nav-item has-treeview menu-open">
            <a href="/" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i class="right"></i>
              </p>
            </a>
          </li>

          <li class="nav-item has-treeview">
            <a href="#" class="nav-link">
              <i class="nav-icon fab fa-artstation"></i>
              <p>
                Station
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="/station" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Station 1</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/station" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Station 2</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/station" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Station 3</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="/station" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Station 4</p>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
