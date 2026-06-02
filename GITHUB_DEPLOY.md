# 🚀 GitHub Pages 배포 가이드

이 프로젝트를 GitHub Pages에 배포하고 운영하기 위한 완전한 가이드입니다. 
자동 배포를 위한 GitHub Actions 워크플로우 설정(`.github/workflows/deploy.yml`)과 Vite 경로 설정(`vite.config.ts`)이 이미 완벽히 세팅되어 있습니다.

---

## 📋 1단계: 프로젝트 다운로드하기
현재 완료된 웹사이트 파일을 로컬 컴퓨터로 다운로드합니다.
1. 화면 오른쪽 위의 **설정(Settings 또는 톱니바퀴 아이콘)** 메뉴를 클릭합니다.
2. **Export to ZIP** 버튼을 클릭하여 전체 소스 코드가 담긴 압축 파일을 다운로드하고 압축을 해제합니다.
   * *또는 GitHub 계정이 이미 연결되어 있다면 **Export to GitHub**를 이용하여 직접 저장소로 내보내실 수도 있습니다.*

---

## 📦 2단계: GitHub에 코드 올리기
로컬 프로젝트를 본인의 새로운 GitHub 저장소(Repository)에 등록합니다.

### 방법 A: Git CLI를 이용하는 방법 (개발자 권장)
1. GitHub 웹사이트에 접속하여 **New repository**를 생성합니다. (저장소 이름 예: `aether-run-x900`)
2. 컴퓨터 터미널에서 프로젝트 폴더로 이동한 후 아래 명령어를 순서대로 입력합니다:
   ```bash
   git init
   git add .
   git commit -m "Initialize project for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/사용자이름/저장소이름.git
   git push -u origin main
   ```

### 방법 B: GitHub Desktop 또는 웹 직접 업로드 방법
1. GitHub 새 저장소를 생성할 때 `Add a README file`에 체크하지 않고 빈 상태로 생성합니다.
2. 생성 후 화면 중앙에 보이는 **uploading an existing file** 링크를 클릭합니다.
3. 압축을 해제한 폴더의 **모든 파일과 폴더**를 웹 브라우저 창으로 드래그 앤 드롭한 뒤, 하단의 **Commit changes**를 클릭해 반영합니다.

---

## ⚙️ 3단계: GitHub Actions 권한 열어주기 (가장 중요 ⭐)
자동 배포 액션이 정상적으로 새로운 배포용 브랜치(`gh-pages`)를 만들고 수정할 수 있도록 권한을 부여해야 합니다.

1. 본인의 GitHub 저장소 페이지 상단 메뉴에서 **Settings** 탭으로 이동합니다.
2. 왼쪽 메뉴에서 **Actions** -> **General** 항목을 성공적으로 클릭합니다.
3. 스크롤을 맨 아래로 내려 **Workflow permissions** 섹션을 찾습니다.
4. 선택 항목을 **Read and write permissions**로 변경합니다.
5. 아래의 **Save** 버튼을 눌러 반드시 저장합니다.

---

## 🏃 4단계: 자동 빌드 및 배포 확인하기
권한 설정이 끝나면 자동으로 배포가 시작됩니다.

1. 저장소 상단 메뉴의 **Actions** 탭을 클릭해 봅니다.
2. `Deploy to GitHub Pages` 워크플로우가 실행 중인 것을 볼 수 있습니다. (초록색 체크 마크로 성공하면 빌드가 끝난 것입니다.)
3. 빌드가 완료되면 저장소에 자동으로 `gh-pages`라는 새로운 브랜치가 생성됩니다.

---

## 🌐 5단계: 배포용 주소 확인 및 실행하기
1. 저장소 상단의 **Settings** 탭으로 한 번 더 이동합니다.
2. 왼쪽 메뉴에서 **Pages** 탭을 클릭합니다.
3. **Build and deployment** 섹션의 Source가 `Deploy from a branch`로 설정되어 있는지 확인합니다.
4. **Branch** 부분에서 첫 번째 드롭다운을 `gh-pages`로 선택하고, 두 번째 폴더 경로를 `/ (root)`로 변경한 후 **Save** 버튼을 누릅니다.
5. 대략 1~2분 정도 기다린 뒤 페이지를 새로고침하면, 상단에 **"Your site is live at https://사용자이름.github.io/저장소이름/"** 형태로 배포 URL이 활성화됩니다!

---

## 👋 문제 발생 시 조치법 (Q&A)
* **화면이 하얗게 나오고 아무것도 보이지 않습니다 (404 에러 등):**
  * 이미 `vite.config.ts`에 `base: './'` 설정이 추가되어 이 문제는 사전에 예방되었습니다. 안심하고 사용해 주시면 됩니다.
* **배포 권한 오류(Permission denied)가 뜹니다:**
  * 3단계의 **Settings -> Actions -> General -> Read and write permissions** 설정이 정상적으로 저장되었는지 다시 확인해 주세요.
